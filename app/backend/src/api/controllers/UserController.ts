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

  async userRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const role = await this._service.getUserRole(email);
      return res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  }
}
