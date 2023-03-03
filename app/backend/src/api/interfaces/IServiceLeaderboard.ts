import Match from '../../database/models/Match';

export default interface IServiceLeaderboard {
  homeTeamsPerformace(): Promise<Match[]>;
  awayTeamsPerformace(): Promise<Match[]>;
}
