import * as chai from 'chai';
import * as Sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../src/app';
import Match from '../database/models/Match';
import { Model } from 'sequelize';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testes para a rota MATCH', function () {
  afterEach(function () {
    Sinon.restore();
  });

  it('Metodo GET: Deve retornar uma lista com todas as partidas', async function() {
    const outputMock: Match[] = [
      {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      },
    ] as unknown as Match[];

    Sinon.stub(Model, 'findAll').resolves(outputMock);

    const result = await chai.request(app).get('/matches');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(outputMock);
  });

  it('Metodo PATCH: Deve finalizar uma partida com sucesso', async function() {
    const login = { email: 'admin@admin.com', password: 'secret_admin'};
    const idMock = 1;
    const matchMock: Match = {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 1,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": true,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Grêmio"
      }
    } as unknown as Match;
    const outputMock = { message: 'Finished'};

    const responseLogin = await chai.request(app).post('/login').send(login);
    expect(responseLogin.body.token).not.to.be.empty;
    const token: string = responseLogin.body.token;

    Sinon.stub(Model, 'findOne').resolves(matchMock);
    Sinon.stub(Match, 'update').resolves();
    const response = await chai.request(app).patch(`/matches/${idMock}/finish`).set('authorization', token);
      
    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(outputMock);
  });

  it('Metodo PATCH: Deve atualizar o resultado de uma partida em andamento com sucesso', async function() {
    const login = { email: 'admin@admin.com', password: 'secret_admin'};
    const idMock = 1;
    const matchMock: Match = {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 1,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": true,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Grêmio"
      }
    } as unknown as Match;
    const outputMock = { message: 'Goals updated successfully'};

    const responseLogin = await chai.request(app).post('/login').send(login);
    expect(responseLogin.body.token).not.to.be.empty;
    const token: string = responseLogin.body.token;

    Sinon.stub(Model, 'findOne').resolves(matchMock);
    Sinon.stub(Match, 'update').resolves();
    const response = await chai.request(app).patch(`/matches/${idMock}`).set('authorization', token);
      
    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(outputMock);
  });
})