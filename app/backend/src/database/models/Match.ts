import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  declare readonly id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team_id', // o nome da onde estara a chave estrangeira
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamId: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team_id', // o nome da onde estara a chave estrangeira
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'matches',
});

Match.belongsTo(Team, { foreignKey: 'id', as: 'home_team_id' });
Match.belongsTo(Team, { foreignKey: 'id', as: 'away_team_id' });

Team.hasMany(Match, { foreignKey: 'id', as: 'home_team_id' });
Team.hasMany(Match, { foreignKey: 'id', as: 'away_team_id' });
