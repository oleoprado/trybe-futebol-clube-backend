import { Request, Response } from 'express';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

export default class LeaderboardController {
  private _service: IServiceLeaderboard;

  constructor(service: IServiceLeaderboard) {
    this._service = service;
  }

  async homeTeam(_req: Request, res: Response) {
    const results = await this._service.homeTeamsPerformace();
    return res.status(200).json(results);
  }

  async awayTeam(_req: Request, res: Response) {
    const results = await this._service.awayTeamsPerformace();
    return res.status(200).json(results);
  }
}
