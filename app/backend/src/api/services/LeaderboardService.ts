import { ModelStatic, fn, col, literal, ProjectionAlias } from 'sequelize';
import Team from '../../database/models/Team';
import Match from '../../database/models/Match';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

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
      [literal('SUM(home_team_goals) - SUM(away_team_goals)'), 'goalsBalance'],
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
      [literal('SUM(away_team_goals) - SUM(home_team_goals)'), 'goalsBalance'],
      [literal(`
        CAST(((SUM(away_team_goals > home_team_goals) * 3) +
        SUM(away_team_goals = home_team_goals)) / (COUNT(away_team_id) * 3) * 100
        AS DECIMAL(5,2))`), 'efficiency'],
    ].map(([exp, alias]) => [exp, alias] as ProjectionAlias);
  }
}
