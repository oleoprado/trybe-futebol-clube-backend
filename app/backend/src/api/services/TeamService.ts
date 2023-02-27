import { ModelStatic } from 'sequelize';
import Team from '../../database/models/Team';
import IServiceTeam from '../interfaces/IServiceTeam';

export default class TeamService implements IServiceTeam {
  protected model: ModelStatic<Team> = Team;

  async readAll(): Promise<Team[]> {
    return this.model.findAll();
  }
}
