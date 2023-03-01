import { ModelStatic } from 'sequelize';
import Team from '../../database/models/Team';
import Match from '../../database/models/Match';
import IServiceMatch from '../interfaces/IServiceMatch';

export default class MatchService implements IServiceMatch {
  protected model: ModelStatic<Match> = Match;

  async readAll(): Promise<Match[]> {
    return this.model.findAll({ include: [
      { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ] });
  }
}
