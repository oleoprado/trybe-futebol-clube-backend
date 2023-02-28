import { Request, Response, NextFunction } from 'express';
import IServiceUser from '../interfaces/IServiceUser';

export default class UserController {
  private _service: IServiceUser;

  constructor(service: IServiceUser) {
    this._service = service;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await this._service.login({ email, password });
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
