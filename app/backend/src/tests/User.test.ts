import * as chai from 'chai';
import * as Sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../src/app';
import User from '../../src/database/models/User';
import ILogin from '../api/interfaces/ILogin';
import IUser from '../api/interfaces/IUser';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testes para a rota USER', function () {
  afterEach(function() {
    Sinon.restore();
  });

  it('Metodo POST: Deve fazer login com sucesso', async function() {
    const inputMock = { email: 'admin@admin.com', password: 'secret_admin'};

    const response = await chai.request(app).post('/login').send(inputMock);
        
    expect(response.status).to.be.equal(200);
  });

  it('Metodo POST: Deve retornar 401 caso os dados de login não sejam validos', async function() {
    const invalidInput = { email: 'leo.leo.com', password: 212}
    const messageMock = { message: 'Invalid email or password' };
    const result = await chai.request(app).post('/login').send(invalidInput);
    
    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal(messageMock);
  });

  it('Metodo POST: Deve retornar 401 caso a senha fornecida não seja a mesma cadastrada no banco', async function() {
    const inputMock = { email: 'admin@admin.com', password: 'secret_admin23'};
    const messageMock = { message: 'Invalid email or password' };

    const result = await chai.request(app).post('/login').send(inputMock);

    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal(messageMock);
  });

  it('Metodo GET: Deve retornar o status 200 e a role na rota login/role', async function() {
    const inputMock = { email: 'admin@admin.com', password: 'secret_admin'};
    const outputMock = { role: 'admin' };
    const responseLogin = await chai.request(app).post('/login').send(inputMock);
    expect(responseLogin.body.token).not.to.be.empty;
    const token: string = responseLogin.body.token;

    const response = await chai.request(app).get('/login/role').set('authorization', token);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(outputMock);
  });
})