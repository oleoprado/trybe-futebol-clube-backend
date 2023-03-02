import Match from '../../database/models/Match';

// export interface IFinish { inProgress: boolean }
export interface IFinished { message: string }

export default interface IServiceMatch {
  readAll(): Promise<Match[]>;
  readAllInProgress(query: string): Promise<Match[]>;
  endMatches(id: number): Promise<IFinished>
}
