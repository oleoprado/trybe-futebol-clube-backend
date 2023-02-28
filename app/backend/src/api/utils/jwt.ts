import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
};

interface IPayload {
  email: string;
}

class Jwt {
  private _secret = process.env.JWT_SECRET;

  generateToken(payload: IPayload) {
    if (!this._secret) throw new Error('JWT secret is not defined');

    try {
      return jwt.sign(payload, this._secret, jwtConfig);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('failed to generate token');
      }
    }
  }

  decodeToken(token: string) {
    if (!token) throw new Error('Token not found');
    if (!this._secret) throw new Error('JWT secret is not defined');

    try {
      return jwt.verify(token, this._secret);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}

export default Jwt;
