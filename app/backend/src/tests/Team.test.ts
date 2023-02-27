import * as chai from 'chai';
import * as Sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../src/app';
import { Model } from 'sequelize';
import Team from '../../src/database/models/Team';
import { Response } from 'superagent';
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
  })
})