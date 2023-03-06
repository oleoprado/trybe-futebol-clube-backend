<!-- # :construction: README em construção ! :construction: -->
<div align="center">
<img src=".github/cover.jpg" />

</div>
<div align="center">
<h1>Trybe Futebol Clube</h1>


<!-- BADGES W/ LINK (see https://shields.io/)-->
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) &nbsp; ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) &nbsp; ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) &nbsp; ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) &nbsp; ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white) &nbsp; ![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white) &nbsp; ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) &nbsp;
</div>

<!-- DESCRIPTION -->

<p>
O TFC é uma aplicação web que fornece informações sobre partidas e classificações de futebol. Foi desenvolvida uma Rest API utilizando o método TDD e integrou as aplicações por meio do docker-compose para consumir um banco de dados.
</p>
<p>
O objetivo do projeto foi desenvolver um back-end dockerizado utilizando modelagem de dados por meio do ORM Sequelize. A API criada segue as regras de negócio fornecidas pelo projeto e foi capaz de ser consumida por um front-end já provido pelo time de desenvolvimento da Trybe.
</p>
<p>
Para adicionar uma partida, é necessário estar logado e possuir um token de autenticação. Haverá um relacionamento entre as tabelas teams e matches para fazer as atualizações das partidas. O back-end implementa regras de negócio para popular adequadamente a tabela disponível no front-end, que será exibida para a pessoa usuária do sistema.
</p>


<!-- INSTALLATION AND USAGE -->

## ⚙️ Instalação e Uso

Você precisa do [node](https://nodejs.org/en/download/) para executar este projeto. Este projeto foi criado usando a versão `v16.15.1.`
Você precisa do [docker](https://www.docker.com/products/docker-desktop/) e do [docker compose cli](https://www.docker.com/products/docker-desktop/) para executar este projeto. Este projeto foi criado usando as versões `v20.10` e `v1.29` respectivas.

Para executar esta aplicação, você precisa fazer o clone para seu computador:

```bash
git clone git@github.com:oleoprado/trybe-futebol-clube-backend.git
```

Entre no diretório:

```bash
cd trybe-futebol-clube-backend
```

Instalar as depedências:

```bash
npm install
```

Rodar o script para subir o docker:

```bash
npm run compose:up
```

Para rodar a aplicação:

```bash
npm run start
```

A aplicação estará acessível:

```bash
Front-end: https://localhost:3000
Back-end: https://localhost:3001
```

Para rodar os testes de integração das camadas:

```bash
npm run test
```


<!-- CONTACT -->

## ✉️ Contato

[![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/oleoprado/) ![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)


<!-- LICENSE -->

## 📝 Licença

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
