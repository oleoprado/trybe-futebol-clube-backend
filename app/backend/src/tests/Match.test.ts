import * as chai from 'chai';
import * as Sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../src/app';
import Match from '../database/models/Match';
import { Model } from 'sequelize';
import {
  matchesList,
  validLogin,
  validMatchId,
  match,
  finished,
  goalsUpdated,
  invalidMatchId,
  matchNotFound,
  validCreateMatch,
  outputCreateMatch,
  invalidCreateMatch,
  teamsNotFound,
  invalidEqualTeams,
  team,
  teamsNotPossibleCreate,
  matchesInProgressList,
  tokenNotFound,
} from './mocks/matchMocks';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testes para a rota MATCH', function () {
  const authenticate = async function() {
    const responseLogin = await chai.request(app).post('/login').send(validLogin);
    expect(responseLogin.body.token).not.to.be.empty;
    return responseLogin.body.token;
  }

  afterEach(function () {
    Sinon.restore();
  });

  it('Metodo GET: Deve retornar uma lista com todas as partidas', async function () {
    Sinon.stub(Model, 'findAll').resolves(matchesList);
    const result = await chai.request(app).get('/matches');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(matchesList);
  });

  it('Metodo PATCH: Deve finalizar uma partida com sucesso', async function () {
    const token: string = await authenticate();

    Sinon.stub(Model, 'findOne').resolves(match);
    Sinon.stub(Match, 'update').resolves();
    const response = await chai.request(app).patch(`/matches/${validMatchId}/finish`).set('authorization', token);

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(finished);
  });

  it('Metodo PATCH: Deve atualizar o resultado de uma partida em andamento com sucesso', async function () {
    const token: string = await authenticate();

    Sinon.stub(Model, 'findOne').resolves(match);
    Sinon.stub(Match, 'update').resolves();
    const response = await chai.request(app).patch(`/matches/${validMatchId}`).set('authorization', token);

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(goalsUpdated);
  });

  it('Metodo PATCH: Deve retornar 404 caso não encontre a partida para atualizar o placar', async function () {
    const token: string = await authenticate();

    Sinon.stub(Model, 'findOne').resolves(null);
    const response = await chai.request(app).patch(`/matches/${invalidMatchId}`).set('authorization', token);

    expect(response.status).to.be.equal(404)
    expect(response.body).to.be.deep.equal(matchNotFound);
  });

  it('Metodo POST: Deve cadastrar uma nova partida em andamento com sucesso', async function () {
    const token: string = await authenticate();

    Sinon.stub(Model, 'create').resolves(outputCreateMatch);

    const response = await chai.request(app).post('/matches').send(validCreateMatch).set('authorization', token);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(outputCreateMatch);
  });

  it('Metodo POST: Deve retornar um 404 caso os times não estejam cadastrados', async function () {
    const token: string = await authenticate();;

    Sinon.stub(Model, 'findByPk').resolves(null);
    const response = await chai.request(app).post('/matches').send(invalidCreateMatch).set('authorization', token);

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal(teamsNotFound);
  });

  it('Metodo POST: Deve retornar um 422 caso os times sejam iguais', async function () {
    const token: string = await authenticate();

    Sinon.stub(Model, 'findByPk').resolves(team);
    const response = await chai.request(app).post('/matches').send(invalidEqualTeams).set('authorization', token);  

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal(teamsNotPossibleCreate);
  });

  it('Metodo POST: Deve retornar um status 401 caso o token não seja valido ao cadastrar uma partida', async function () {
    Sinon.stub(Model, 'create').resolves(outputCreateMatch);
    const response = await chai.request(app).post('/matches').send(validCreateMatch);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal(tokenNotFound);
  })

  it('Metodo GET: Deve retornar uma lista de matches inProgress true', async function() {
    const token: string = await authenticate();

    Sinon.stub(Model, 'findAll').resolves(matchesInProgressList);
    const response = await chai.request(app).get('/matches?inProgress=true').set('authorization', token);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(matchesInProgressList);
  });

  it('Metodo PATCH: Deve retornar 404 caso não encontre a partida para finalizar', async function() {
    const token: string = await authenticate();

    Sinon.stub(Model, 'findOne').resolves(null);
    const response = await chai.request(app).patch('/matches/999/finish').set('authorization', token);

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal(matchNotFound);
  });
})