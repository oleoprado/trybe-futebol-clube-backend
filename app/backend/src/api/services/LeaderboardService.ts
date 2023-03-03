import { ModelStatic, fn, col, literal } from 'sequelize';
import Team from '../../database/models/Team';
import Match from '../../database/models/Match';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

export default class LeaderboardService implements IServiceLeaderboard {
  protected model: ModelStatic<Match> = Match;

  async teamsPerformace(): Promise<Match[]> {
    return this.model.findAll({
      attributes: [
        [fn('max', col('homeTeam.team_name')), 'name'],
        [literal(`
          (SUM(home_team_goals > away_team_goals) * 3) +
          SUM(home_team_goals = away_team_goals)`), 'totalPoints'],
        [fn('COUNT', col('home_team_id')), 'totalGames'],
        [fn('SUM', literal('home_team_goals > away_team_goals')), 'totalVictories'],
        [fn('SUM', literal('home_team_goals = away_team_goals')), 'totalDraws'],
        [fn('SUM', literal('away_team_goals > home_team_goals')), 'totalLosses'],
        [fn('SUM', col('home_team_goals')), 'goalsFavor'],
        [fn('SUM', col('away_team_goals')), 'goalsOwn'],
        // [literal('SUM(home_team_goals) - SUM(away_team_goals)'), 'goalsBalance'],
        // [literal(`
        //   ((SUM(home_team_goals > away_team_goals) * 3) +
        //   SUM(home_team_goals = away_team_goals)) / (COUNT(home_team_id) * 3) * 100`),
        // 'efficiency'],
      ],
      include: [{ model: Team, as: 'homeTeam', attributes: [] }],
      group: ['home_team_id'],
      where: { inProgress: false },
    });
  }
}
