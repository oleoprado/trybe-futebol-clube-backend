import { Request, Response, NextFunction } from 'express';
import BadRequest from '../errors/badRequest';

export default class ValidateInputLogin {
  public static varifyFields(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequest('All fields must be filled');
    }
    next();
  }
}
