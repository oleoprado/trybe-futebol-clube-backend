import Match from '../../database/models/Match';
import ITeamPerformance from './ITeamPerformance';

export default interface IServiceLeaderboard {
  homeTeamsPerformace(): Promise<Match[]>;
  awayTeamsPerformace(): Promise<Match[]>;

  leaderboard(): Promise<ITeamPerformance[]>;
}
