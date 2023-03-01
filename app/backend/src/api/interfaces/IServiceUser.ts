// import User from '../../database/models/User';
import IJwt from './IJwt';
import ILogin from './ILogin';
import IRole from './IRole';

export default interface IServiceUser {
  login(dto: ILogin): Promise<IJwt>;
  getUserRole(username: string): Promise<IRole>;
}
