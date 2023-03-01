import * as chai from 'chai';
import * as Sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../../src/app';
import User from '../../src/database/models/User';
import ILogin from '../api/interfaces/ILogin';
import IUser from '../api/interfaces/IUser';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testes para a rota USER', function () {
  const app = new App();

  afterEach(function() {
    Sinon.restore();
  });

  it('Metodo POST: Deve fazer login com sucesso', async function() {
    const inputMock = { email: 'chico@gmail.com', password: 'nicaoEhBrabo'};

    const response = await chai.request(app.app).post('/login').send(inputMock);
    console.log('response ===>', response);
    
    expect(response.status).to.be.equal(200);
    // expect(result.body).to.be.deep.equal(outputMock);
  });

  // it('Metodo POST: Deve retornar 401 caso o login falhe', async function() {
  //   const invalidInput = { email: 'leo.leo.com', password: 212}
  //   const messageMock = { message: 'Invalid email or password' };
  //   const result = await chai.request(app).post('/login').send(invalidInput);
    
  //   expect(result.status).to.be.equal(401);
  //   expect(result.body).to.be.deep.equal(messageMock);
  // })
})