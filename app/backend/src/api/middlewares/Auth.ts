import { Request, Response, NextFunction } from 'express';
import InvalidField from '../errors/invalidField';
import Jwt from '../utils/jwt';

const JWT = new Jwt();

export default class Auth {
  public static auth(req: Request, _res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) throw new InvalidField('Token not found');
    const decoded = JWT.decodeToken(authorization);
    if (decoded instanceof Error) throw new InvalidField('Token must be a valid token');

    req.body = decoded;
    next();
  }
}
