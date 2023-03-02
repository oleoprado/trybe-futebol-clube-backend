import * as chai from 'chai';
import * as Sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../src/app';
import Match from '../database/models/Match';
import IMatch from '../api/interfaces/IMatch';
import { Model } from 'sequelize';
import Team from '../database/models/Team';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testes para a rota MATCH', function () {
  afterEach(function () {
    Sinon.restore();
  });

  it('Metodo GET: Deve retornar uma lista com todas as partidas', async function () {
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

  it('Metodo PATCH: Deve finalizar uma partida com sucesso', async function () {
    const login = { email: 'admin@admin.com', password: 'secret_admin' };
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
    const outputMock = { message: 'Finished' };

    const responseLogin = await chai.request(app).post('/login').send(login);
    expect(responseLogin.body.token).not.to.be.empty;
    const token: string = responseLogin.body.token;

    Sinon.stub(Model, 'findOne').resolves(matchMock);
    Sinon.stub(Match, 'update').resolves();
    const response = await chai.request(app).patch(`/matches/${idMock}/finish`).set('authorization', token);

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(outputMock);
  });

  it('Metodo PATCH: Deve atualizar o resultado de uma partida em andamento com sucesso', async function () {
    const login = { email: 'admin@admin.com', password: 'secret_admin' };
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
    const outputMock = { message: 'Goals updated successfully' };

    const responseLogin = await chai.request(app).post('/login').send(login);
    expect(responseLogin.body.token).not.to.be.empty;
    const token: string = responseLogin.body.token;

    Sinon.stub(Model, 'findOne').resolves(matchMock);
    Sinon.stub(Match, 'update').resolves();
    const response = await chai.request(app).patch(`/matches/${idMock}`).set('authorization', token);

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(outputMock);
  });

  it('Metodo PATCH: Deve retornar 404 caso não encontre a partida para atualizar o placar', async function () {
    const login = { email: 'admin@admin.com', password: 'secret_admin' };
    const idMock = 999;
    const outputMock = { message: 'Match not found' };

    const responseLogin = await chai.request(app).post('/login').send(login);
    expect(responseLogin.body.token).not.to.be.empty;
    const token: string = responseLogin.body.token;

    Sinon.stub(Model, 'findOne').resolves(null);
 
    const response = await chai.request(app).patch(`/matches/${idMock}`).set('authorization', token);

    expect(response.status).to.be.equal(404)
    expect(response.body).to.be.deep.equal(outputMock);
  });

  it('Metodo POST: Deve cadastrar uma nova partida em andamento com sucesso', async function () {
    const login = { email: 'admin@admin.com', password: 'secret_admin' };
    const inputMock: IMatch = {
      "homeTeamId": 16,
      "awayTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }
    const outputMock: Match = {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 8,
      "awayTeamGoals": 2,
      "inProgress": true,
    } as Match

    const responseLogin = await chai.request(app).post('/login').send(login);
    expect(responseLogin.body.token).not.to.be.empty;
    const token: string = responseLogin.body.token;

    Sinon.stub(Model, 'create').resolves(outputMock);

    const response = await chai.request(app).post('/matches').send(inputMock).set('authorization', token);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(outputMock);
  });

  it('Metodo POST: Deve retornar um 404 caso os times não estejam cadastrados', async function () {
    const login = { email: 'admin@admin.com', password: 'secret_admin' };
    const inputMock: IMatch = {
      "homeTeamId": 999,
      "awayTeamId": 420,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }
    const outputMock = { message: 'There is no team with such id!' };

    const responseLogin = await chai.request(app).post('/login').send(login);
    expect(responseLogin.body.token).not.to.be.empty;
    const token: string = responseLogin.body.token;

    Sinon.stub(Model, 'findByPk').resolves(null);

    const response = await chai.request(app).post('/matches').send(inputMock).set('authorization', token);

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal(outputMock);
  });

  it('Metodo POST: Deve retornar um 422 caso os times sejam iguais', async function () {
    const login = { email: 'admin@admin.com', password: 'secret_admin' };
    const inputMock: IMatch = {
      "homeTeamId": 1,
      "awayTeamId": 1,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }
    const outputTeam: Team = {id: 4, teamName: 'Corinthians'} as Team;

    const outputMock = { message: 'It is not possible to create a match with two equal teams' };

    const responseLogin = await chai.request(app).post('/login').send(login);
    expect(responseLogin.body.token).not.to.be.empty;
    const token: string = responseLogin.body.token;

    Sinon.stub(Model, 'findByPk').resolves(outputTeam);

    const response = await chai.request(app).post('/matches').send(inputMock).set('authorization', token);  

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal(outputMock);
  });

  it('Metodo POST: Deve retornar um status 401 caso o token não seja valido ao cadastrar uma partida', async function () {
    const inputMock: IMatch = {
      "homeTeamId": 16,
      "awayTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }
    const outputMock: Match = {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 8,
      "awayTeamGoals": 2,
      "inProgress": true,
    } as Match
    const messageMock = { message: "Token not found" }
    Sinon.stub(Model, 'create').resolves(outputMock);
    const response = await chai.request(app).post('/matches').send(inputMock);
    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal(messageMock);
  })

  it('Metodo GET: Deve retornar uma lista de matches inProgress true', async function() {
    const login = { email: 'admin@admin.com', password: 'secret_admin'};
    const outputMock: Match[] = [{
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 8,
      "awayTeamGoals": 2,
      "inProgress": true,
    }] as Match[];
    const responseLogin = await chai.request(app).post('/login').send(login);
    expect(responseLogin.body.token).not.to.be.empty;
    const token: string = responseLogin.body.token;

    Sinon.stub(Model, 'findAll').resolves(outputMock);

    const response = await chai.request(app).get('/matches?inProgress=true').set('authorization', token);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(outputMock);
  });

  it('Metodo PATCH: Deve retornar 404 caso não encontre a partida para finalizar', async function() {
    const login = { email: 'admin@admin.com', password: 'secret_admin'};
    const outputMock = { message: 'Match not found'}
    const responseLogin = await chai.request(app).post('/login').send(login);
    expect(responseLogin.body.token).not.to.be.empty;
    const token: string = responseLogin.body.token;

    Sinon.stub(Model, 'findOne').resolves(null);

    const response = await chai.request(app).patch('/matches/999/finish').set('authorization', token);

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal(outputMock);
  });
})