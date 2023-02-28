// import User from '../../database/models/User';
import IJwt from './IJwt';
import ILogin from './ILogin';

export default interface IServiceUser {
  login(dto: ILogin): Promise<IJwt>;
}
