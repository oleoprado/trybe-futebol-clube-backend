import { ModelStatic } from 'sequelize';
import Team from '../../database/models/Team';
import IServiceTeam from '../interfaces/IServiceTeam';
// import IdNotFoundError from '../errors/idNotFoundError';

export default class TeamService implements IServiceTeam {
  protected model: ModelStatic<Team> = Team;

  async readAll(): Promise<Team[]> {
    return this.model.findAll();
  }

  async readById(id: number): Promise<Team> {
    const team = await this.model.findByPk(id);
    return team as unknown as Team;
  }
}
