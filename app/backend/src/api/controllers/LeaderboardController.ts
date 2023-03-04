import { Request, Response } from 'express';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

export default class LeaderboardController {
  private _service: IServiceLeaderboard;

  constructor(service: IServiceLeaderboard) {
    this._service = service;
  }

  async homeTeam(_req: Request, res: Response) {
    const result = await this._service.homeTeamsPerformace();
    return res.status(200).json(result);
  }

  async awayTeam(_req: Request, res: Response) {
    const result = await this._service.awayTeamsPerformace();
    return res.status(200).json(result);
  }

  async classificacao(_req: Request, res: Response) {
    const result = await this._service.leaderboard();
    return res.status(200).json(result);
  }
}
