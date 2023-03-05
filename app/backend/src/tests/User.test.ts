import * as chai from 'chai';
import * as Sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../src/app';
import {
  validLogin,
  invalidLogin,
  invalidEmailOrPassword,
  invalidPassword ,
  role,
} from './mocks/userMocks';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testes para a rota USER', function () {
  afterEach(function() {
    Sinon.restore();
  });

  it('Metodo POST: Deve fazer login com sucesso', async function() {
    const response = await chai.request(app).post('/login').send(validLogin);
        
    expect(response.status).to.be.equal(200);
  });

  it('Metodo POST: Deve retornar 401 caso os dados de login não sejam validos', async function() {
    const result = await chai.request(app).post('/login').send(invalidLogin);
    
    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal(invalidEmailOrPassword);
  });

  it('Metodo POST: Deve retornar 401 caso a senha fornecida não seja a mesma cadastrada no banco', async function() {
    const result = await chai.request(app).post('/login').send(invalidPassword);

    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal(invalidEmailOrPassword);
  });

  it('Metodo GET: Deve retornar o status 200 e a role na rota login/role', async function() {
    const responseLogin = await chai.request(app).post('/login').send(validLogin);
    expect(responseLogin.body.token).not.to.be.empty;
    const token: string = responseLogin.body.token;

    const response = await chai.request(app).get('/login/role').set('authorization', token);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(role);
  });
})