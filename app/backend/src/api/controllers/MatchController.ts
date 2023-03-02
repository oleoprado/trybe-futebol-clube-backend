import { Request, Response, NextFunction } from 'express';
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

  async endMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const message = await this._service.endMatches(Number(id));
      return res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }

  async updateGoals(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const message = await this._service.updateGoals(Number(id), req.body);
      return res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const match = await this._service.create(req.body);
      return res.status(201).json(match);
    } catch (error) {
      next(error);
    }
  }
}
