import * as chai from 'chai';
import * as Sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../src/app';
import { Model } from 'sequelize';
import Team from '../../src/database/models/Team';
import ITeam from '../api/interfaces/ITeam';

const { expect } = chai;

chai.use(chaiHttp);

describe('Testes para a rota TEAMS', function () {
  // let chaiHttpResponse: Response;

  afterEach(function () {
    Sinon.restore();
  });

  it('Metodo GET: Deve retornar todos os teams cadastrados', async function () {
    const outputMock: Team[] = [{ id: 1, teamName: 'Avaí/Kindermann'}] as Team[];
    Sinon.stub(Model, 'findAll').resolves(outputMock);
    const result = await chai.request(app).get('/teams');
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(outputMock);
  });

  it('Metodo GET: Deve retornar o time correspondente ao ID informado', async function(){
    const reqParamsMock = 4;
    const outputMock: Team = {id: 4, teamName: 'Corinthians'} as Team;
    Sinon.stub(Model, 'findByPk').resolves(outputMock);

    const result = await chai.request(app).get(`/teams/${reqParamsMock}`);

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(outputMock);
  });

  // it('Metodo GET: Deve retornar 404, quando o id não existir', async function() {
  //   Sinon.stub(Model, 'findOne').resolves(null);
  //   const response = await chai.request(app).get('/teams/420');
        
  //   expect(response.status).to.be.equal(404);
  // });
})