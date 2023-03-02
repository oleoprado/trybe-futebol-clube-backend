import { ModelStatic } from 'sequelize';
import Team from '../../database/models/Team';
import Match from '../../database/models/Match';
import IServiceMatch, { IMessage, IUpdateGoals } from '../interfaces/IServiceMatch';
import NotFoundError from '../errors/notFoundError';

export default class MatchService implements IServiceMatch {
  protected model: ModelStatic<Match> = Match;

  async readAll(): Promise<Match[]> {
    return this.model.findAll({ include: [
      { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ] });
  }

  async readAllInProgress(query: string): Promise<Match[]> {
    const inProgress = JSON.parse(query);

    return this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress },
    });
  }

  async endMatches(id: number): Promise<IMessage> {
    const match = await this.model.findOne({ where: { id } });
    if (!match) throw new NotFoundError('Match not found');
    await this.model.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }

  async updateGoals(id: number, dto: IUpdateGoals): Promise<IMessage> {
    const { homeTeamGoals, awayTeamGoals } = dto;
    const match = await this.model.findOne({ where: { id } });
    if (!match) throw new NotFoundError('Match not found');

    if (match.inProgress) {
      await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    }
    return { message: 'Goals updated successfully' };
  }
}
