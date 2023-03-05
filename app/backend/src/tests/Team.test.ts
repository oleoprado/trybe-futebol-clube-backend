import * as chai from 'chai';
import * as Sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../src/app';
import Team from '../../src/database/models/Team';
import { teamsList, validTeamId, team } from './mocks/teamMocks';

const { expect } = chai;

chai.use(chaiHttp);

describe('Testes para a rota TEAMS', function () {
  afterEach(function () {
    Sinon.restore();
  });

  it('Metodo GET: Deve retornar todos os teams cadastrados', async function () {
    Sinon.stub(Team, 'findAll').resolves(teamsList);
    const result = await chai.request(app).get('/teams');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(teamsList);
  });

  it('Metodo GET: Deve retornar o time correspondente ao ID informado', async function(){
    Sinon.stub(Team, 'findByPk').resolves(team);

    const result = await chai.request(app).get(`/teams/${validTeamId}`);

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(team);
  });

})