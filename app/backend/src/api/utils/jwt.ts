import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import InvalidField from '../errors/invalidField';
import BadRequest from '../errors/badRequest';

const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
};

export interface IPayload {
  email: string;
}

class Jwt {
  private _secret = process.env.JWT_SECRET;

  generateToken(payload: IPayload) {
    if (!this._secret) throw new InvalidField('JWT secret is not defined');

    try {
      return jwt.sign(payload, this._secret, jwtConfig);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequest('failed to generate token');
      }
    }
  }

  decodeToken(token: string) {
    if (!token) throw new InvalidField('Token not found');
    if (!this._secret) throw new InvalidField('JWT secret is not defined');

    try {
      return jwt.verify(token, this._secret);
    } catch (error) {
      if (error instanceof Error) {
        throw new InvalidField('Token must be a valid token');
      }
    }
  }
}

export default Jwt;
