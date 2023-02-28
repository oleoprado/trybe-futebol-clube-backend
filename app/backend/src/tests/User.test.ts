import * as chai from 'chai';
import * as Sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../src/app';
import User from '../../src/database/models/User';
import ILogin from '../api/interfaces/ILogin';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testes para a rota USER', function () {
  afterEach(function() {
    Sinon.restore();
  });

  it('Metodo POST: Deve fazer login com sucesso', async function() {
    const inputMock: ILogin ={ email: 'chico@gmail.com', password: 'nicaoEhBrabo'};
    const outputMock = {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoaWNvIiwiaWF0IjoxNjc3NjA3MjE2fQ.KLwIrvC6z43ZBV4nJN-4I6gbLQmo0IbQZuvQIvWj5Jc"}

    Sinon.stub(User, 'findOne').resolves();
    const result = await chai.request(app).post('/login').send(inputMock);

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(outputMock);
  });

  it('Metodo POST: Deve retornar 401 caso o login falhe', async function() {
    const invalidInput = { email: 'leo.leo.com', password: 212}
    const messageMock = { message: 'Invalid email or password' };
    const result = await chai.request(app).post('/login').send(invalidInput);
    
    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal(messageMock);
  })
})