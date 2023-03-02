import Match from '../../database/models/Match';

export default interface IServiceLeaderboard {
  homeTeam(): Promise<Match[]>;
}
