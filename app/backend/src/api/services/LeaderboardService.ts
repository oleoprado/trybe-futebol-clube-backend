import { ModelStatic, fn, col, literal, ProjectionAlias } from 'sequelize';
import Team from '../../database/models/Team';
import Match from '../../database/models/Match';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';
import ITeamPerformance from '../interfaces/ITeamPerformance';

export default class LeaderboardService implements IServiceLeaderboard {
  protected model: ModelStatic<Match> = Match;

  async homeTeamsPerformace(): Promise<Match[]> {
    return this.model.findAll({
      attributes: LeaderboardService.buildHomeAttributes(),
      include: [{ model: Team, as: 'homeTeam', attributes: [] }],
      group: ['home_team_id'],
      order: [
        ['totalPoints', 'DESC'],
        ['totalVictories', 'DESC'],
        ['goalsBalance', 'DESC'],
        ['goalsFavor', 'DESC'],
        ['goalsOwn', 'DESC'],
      ],
      where: { inProgress: false },
    });
  }

  async awayTeamsPerformace(): Promise<Match[]> {
    return this.model.findAll({
      attributes: LeaderboardService.buildAwayAttributes(),
      include: [{ model: Team, as: 'awayTeam', attributes: [] }],
      group: ['away_team_id'],
      order: [
        ['totalPoints', 'DESC'],
        ['totalVictories', 'DESC'],
        ['goalsBalance', 'DESC'],
        ['goalsFavor', 'DESC'],
        ['goalsOwn', 'DESC'],
      ],
      where: { inProgress: false },
    });
  }

  private static buildHomeAttributes() {
    return [
      [literal('homeTeam.team_name'), 'name'],
      [literal(`
        CAST((SUM(home_team_goals > away_team_goals) * 3) +
        SUM(home_team_goals = away_team_goals) AS UNSIGNED)`), 'totalPoints'],
      [fn('COUNT', col('home_team_id')), 'totalGames'],
      [literal('CAST(SUM(home_team_goals > away_team_goals) AS UNSIGNED)'), 'totalVictories'],
      [literal('CAST(SUM(home_team_goals = away_team_goals) AS UNSIGNED)'), 'totalDraws'],
      [literal('CAST(SUM(away_team_goals > home_team_goals) AS UNSIGNED)'), 'totalLosses'],
      [literal('CAST(SUM(home_team_goals) AS UNSIGNED)'), 'goalsFavor'],
      [literal('CAST(SUM(away_team_goals) AS UNSIGNED)'), 'goalsOwn'],
      [literal('CAST(SUM(home_team_goals) - SUM(away_team_goals) AS SIGNED)'), 'goalsBalance'],
      [literal(`
        CAST(((SUM(home_team_goals > away_team_goals) * 3) +
        SUM(home_team_goals = away_team_goals)) / (COUNT(home_team_id) * 3) * 100
        AS DECIMAL(5,2))`), 'efficiency'],
    ].map(([exp, alias]) => [exp, alias] as ProjectionAlias);
  }

  private static buildAwayAttributes() {
    return [
      [literal('awayTeam.team_name'), 'name'],
      [literal(`
        CAST((SUM(away_team_goals > home_team_goals) * 3) +
        SUM(away_team_goals = home_team_goals) AS UNSIGNED)`), 'totalPoints'],
      [fn('COUNT', col('away_team_id')), 'totalGames'],
      [literal('CAST(SUM(away_team_goals > home_team_goals) AS UNSIGNED)'), 'totalVictories'],
      [literal('CAST(SUM(away_team_goals = home_team_goals) AS UNSIGNED)'), 'totalDraws'],
      [literal('CAST(SUM(home_team_goals > away_team_goals) AS UNSIGNED)'), 'totalLosses'],
      [literal('CAST(SUM(away_team_goals) AS UNSIGNED)'), 'goalsFavor'],
      [literal('CAST(SUM(home_team_goals) AS UNSIGNED)'), 'goalsOwn'],
      [literal('CAST(SUM(away_team_goals) - SUM(home_team_goals) AS SIGNED)'), 'goalsBalance'],
      [literal(`
        CAST(((SUM(away_team_goals > home_team_goals) * 3) +
        SUM(away_team_goals = home_team_goals)) / (COUNT(away_team_id) * 3) * 100
        AS DECIMAL(5,2))`), 'efficiency'],
    ].map(([exp, alias]) => [exp, alias] as ProjectionAlias);
  }

  static calculateEfficiency(homeStats: ITeamPerformance, awayStats: ITeamPerformance) {
    const totalPoints = homeStats.totalPoints + awayStats.totalPoints;
    const totalGames = (homeStats.totalGames + awayStats.totalGames) * 3;
    return ((totalPoints / totalGames) * 100).toFixed(2);
  }

  static sumPoints(homeStats: ITeamPerformance, awayStats: ITeamPerformance) {
    return {
      name: homeStats.name,
      totalPoints: homeStats.totalPoints + awayStats.totalPoints,
      totalGames: homeStats.totalGames + awayStats.totalGames,
      totalVictories: homeStats.totalVictories + awayStats.totalVictories,
      totalDraws: homeStats.totalDraws + awayStats.totalDraws,
      totalLosses: homeStats.totalLosses + awayStats.totalLosses,
      goalsFavor: homeStats.goalsFavor + awayStats.goalsFavor,
      goalsOwn: homeStats.goalsOwn + awayStats.goalsOwn,
      goalsBalance: homeStats.goalsBalance + awayStats.goalsBalance,
      efficiency: LeaderboardService.calculateEfficiency(homeStats, awayStats),
    };
  }

  static sumTeamPoints(team: ITeamPerformance) {
    const sum = team.totalPoints
      + team.totalGames + team.totalVictories + team.totalDraws + team.totalLosses
      + team.goalsFavor + team.goalsOwn + team.goalsBalance + Number(team.efficiency);
    return sum;
  }

  static sortTable(a: ITeamPerformance, b: ITeamPerformance) {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
    if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
    if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
    if (b.goalsOwn !== a.goalsOwn) return b.goalsOwn - a.goalsOwn;
    return 0;
  }

  static generateRanking(tabela: ITeamPerformance[]) {
    return tabela
      .map((cur) => ({ ...cur, total: LeaderboardService.sumTeamPoints(cur) })) // terminar as somas
      .sort(LeaderboardService.sortTable)
      .map((item) => ({
        name: item.name,
        totalPoints: item.totalPoints,
        totalGames: item.totalGames,
        totalVictories: item.totalVictories,
        totalDraws: item.totalDraws,
        totalLosses: item.totalLosses,
        goalsFavor: item.goalsFavor,
        goalsOwn: item.goalsOwn,
        goalsBalance: item.goalsBalance,
        efficiency: item.efficiency,
      }));
  }

  async leaderboard(): Promise<ITeamPerformance[]> {
    try {
      const [homeMatches, awayMatches] = await Promise.all([
        this.homeTeamsPerformace(),
        this.awayTeamsPerformace(),
      ]);

      const tabela: ITeamPerformance[] = homeMatches.map((homeStats) => {
        const awayStats = awayMatches
          .find((team) => team.dataValues.name === homeStats.dataValues.name);

        if (!awayStats) return homeStats.dataValues;

        const finalStats = LeaderboardService.sumPoints(homeStats.dataValues, awayStats.dataValues);
        return finalStats;
      });

      return LeaderboardService.generateRanking(tabela);
    } catch (err) {
      console.error('Error in classificao:', err);
      throw err;
    }
  }
}
