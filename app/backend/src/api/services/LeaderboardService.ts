import { ModelStatic, fn, col, literal, ProjectionAlias } from 'sequelize';
import Team from '../../database/models/Team';
import Match from '../../database/models/Match';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

export default class LeaderboardService implements IServiceLeaderboard {
  protected model: ModelStatic<Match> = Match;

  async teamsPerformace(): Promise<Match[]> {
    return this.model.findAll({
      attributes: LeaderboardService.buildAttributes(),
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

  private static buildAttributes() {
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
}
