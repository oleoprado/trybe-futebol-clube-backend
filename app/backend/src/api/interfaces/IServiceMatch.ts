import Match from '../../database/models/Match';

export default interface IServiceMatch {
  readAll(): Promise<Match[]>;
  readAllInProgress(query: string): Promise<Match[]>;
}
