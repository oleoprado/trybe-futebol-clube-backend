import 'dotenv/config';
import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import User from '../../database/models/User';
import IJwt from '../interfaces/IJwt';
import ILogin from '../interfaces/ILogin';
import IServiceUser from '../interfaces/IServiceUser';
import Jwt from '../utils/jwt';
// import BadRequest from '../errors/badRequest';
// import NotFoundError from '../errors/notFoundError';
import InvalidField from '../errors/invalidField';
import NotFoundError from '../errors/notFoundError';

const JWT = new Jwt();

export default class UserService implements IServiceUser {
  protected model: ModelStatic<User> = User;

  async login(dto: ILogin): Promise<IJwt> {
    const { email, password } = dto;

    const user = await this._validateIfUserExist(email);
    await UserService._validateUserPassword(password, user.password);
    const token = JWT.generateToken({ email });

    return token as unknown as IJwt;
  }

  private async _validateIfUserExist(email: string): Promise<User> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  static async _validateUserPassword(password: string, userPassword: string): Promise<void> {
    const validPassword = bcrypt.compareSync(password, userPassword);
    if (!validPassword) throw new InvalidField('Invalid email or password');
  }
}
