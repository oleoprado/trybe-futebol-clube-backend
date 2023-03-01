import { Request, Response } from 'express';
import IServiceMatch from '../interfaces/IServiceMatch';

export default class MatchController {
  private _service: IServiceMatch;

  constructor(service: IServiceMatch) {
    this._service = service;
  }

  async readAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress) {
      const matches = await this._service.readAllInProgress(inProgress as string);
      return res.status(200).json(matches);
    }

    const matches = await this._service.readAll();
    return res.status(200).json(matches);
  }
}
