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
  })
})