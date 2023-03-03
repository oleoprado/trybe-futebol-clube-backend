import Match from '../../database/models/Match';

export default interface IServiceLeaderboard {
  teamsPerformace(): Promise<Match[]>;
}
