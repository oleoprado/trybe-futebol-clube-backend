import 'dotenv/config';
import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import * as Joi from 'joi';
import User from '../../database/models/User';
import IJwt from '../interfaces/IJwt';
import ILogin from '../interfaces/ILogin';
import IServiceUser from '../interfaces/IServiceUser';
import Jwt from '../utils/jwt';
import InvalidField from '../errors/invalidField';
import IRole from '../interfaces/IRole';

const JWT = new Jwt();

export default class UserService implements IServiceUser {
  protected model: ModelStatic<User> = User;

  async login(dto: ILogin): Promise<IJwt> {
    const { email, password } = dto;

    await this._validateUser(email, password);
    const token = JWT.generateToken({ email });

    return token as unknown as IJwt;
  }

  async getUserRole(email: string): Promise<IRole> {
    const user = await this.model.findOne({ where: { email } });
    const role = user?.role;
    return role as unknown as IRole;
  }

  protected async _validateUser(email: string, password: string): Promise<void> {
    const user = await this.model.findOne({ where: { email } });
    const schema = Joi.string().email();
    const validEmail = schema.validate(email);
    if (!user || validEmail.error) throw new InvalidField('Invalid email or password');

    await UserService._validateUserPassword(password, user.password);
  }

  static async _validateUserPassword(password: string, userPassword: string): Promise<void> {
    const schema = Joi.string().min(6);
    const passwordInput = schema.validate(password);

    const validPassword = bcrypt.compareSync(password, userPassword);
    if (!validPassword || passwordInput.error) {
      throw new InvalidField('Invalid email or password');
    }
  }
}
