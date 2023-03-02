import { Request, Response } from 'express';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

export default class LeaderboardController {
  private _service: IServiceLeaderboard;

  constructor(service: IServiceLeaderboard) {
    this._service = service;
  }

  async homeTeam(req: Request, res: Response) {
    const results = await this._service.homeTeam();

    return res.status(200).json(results);
  }
}
