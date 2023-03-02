import Match from '../../database/models/Match';

// export interface IFinish { inProgress: boolean }
export interface IMessage { message: string }
export interface IUpdateGoals { homeTeamGoals: number, awayTeamGoals: number }

export default interface IServiceMatch {
  readAll(): Promise<Match[]>;
  readAllInProgress(query: string): Promise<Match[]>;
  endMatches(id: number): Promise<IMessage>;
  updateGoals(id: number, dto: IUpdateGoals): Promise<IMessage>;
}
