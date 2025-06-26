back-bastet

Sistema de gerenciamento de cursos, inscrições e usuários, desenvolvido em Node.js com Express e Sequelize, utilizando banco de dados MySQL.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript server-side.
- **Express**: Framework web para Node.js.
- **Sequelize**: ORM para integração com bancos de dados relacionais.
- **MySQL**: Banco de dados relacional utilizado.
- **JWT (jsonwebtoken)**: Autenticação baseada em tokens.
- **bcrypt**: Criptografia de senhas.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **moment**: Manipulação de datas.
- **nodemon**: Monitoramento e reinicialização automática do servidor durante o desenvolvimento.

## Estrutura do Projeto

- index.js: Ponto de entrada da aplicação.
- database.js: Configuração do Sequelize e conexão com o banco de dados.
- models: Definição dos modelos Sequelize (Usuário, Curso, Inscrição).
- controllers: Lógica das rotas e manipulação das requisições.
- services: Regras de negócio e integração com os modelos.
- routes: Definição das rotas da API.
- middlewares: Middlewares, como autenticação JWT.

## Como rodar o projeto

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Configure o arquivo .env com as variáveis de ambiente do banco e JWT.
3. Crie o banco de dados e as tabelas utilizando o SQL abaixo.
4. Inicie o servidor:
   ```sh
   npm run dev
   ```

## SQL para Criação do Banco de Dados

```sql
CREATE DATABASE bastet;

-- Criação das tabelas
CREATE TABLE USUARIOS(
	ID                 INT          AUTO_INCREMENT PRIMARY KEY,
	NOME               VARCHAR(100) NOT NULL,
	EMAIL              VARCHAR(100) NOT NULL UNIQUE,
	SENHA              VARCHAR(255) NOT NULL,
	NASCIMENTO         DATE         NOT NULL,
	CRIADO_EM          TIMESTAMP    DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE CURSOS(
	ID		           INT          AUTO_INCREMENT PRIMARY KEY,
	NOME               VARCHAR(100) NOT NULL,
	DESCRICAO          TEXT			NOT NULL,
	CAPA               VARCHAR(255),
	INICIO             DATE			NOT NULL
);

CREATE TABLE INSCRICOES(
	ID                 INT 			AUTO_INCREMENT PRIMARY KEY,
	USUARIO_ID         INT			NOT NULL,
	CURSO_ID           INT			NOT NULL,
	DATA_INSCRICAO     TIMESTAMP	DEFAULT CURRENT_TIMESTAMP(),
	DATA_CANCELAMENTO  TIMESTAMP	DEFAULT NULL,
	UNIQUE (USUARIO_ID, CURSO_ID),
	FOREIGN KEY (USUARIO_ID) REFERENCES USUARIOS(ID),
	FOREIGN KEY (CURSO_ID)   REFERENCES CURSOS(ID)
);

-- Seeding Inicial
INSERT INTO USUARIOS
(
	NOME,
	EMAIL,
	SENHA,
	NASCIMENTO
)
VALUES
(
	'Antonio Neto',
	'antonio@neto.com',
	'12345',
	"2002-08-09"
);

INSERT INTO CURSOS
(
	NOME,
	DESCRICAO,
	CAPA,
	INICIO
)
VALUES
(
	'NodeJS e SQL',
	'Programação back-end com Javascript (nodeJS) e banco de dados relacional (mysql)',
	'https://user-images.githubusercontent.com/4727/38117898-75c704e4-336c-11e8-82bb-dffd73f55e94.png',
	"2025-05-28"
);

INSERT INTO CURSOS
(
	NOME,
	DESCRICAO,
	CAPA,
	INICIO
)
VALUES
(
	'React Native',
	'Programação front-end com Javascript (React Native) para apps mobile',
	'https://reactnative.dev/img/logo-og.png',
	"2025-05-28"
);

INSERT INTO CURSOS
(
	NOME,
	DESCRICAO,
	CAPA,
	INICIO
)
VALUES
(
	'Java com Spring Boot',
	'Desenvolvimento back-end com Java utilizando o framework Spring Boot',
	'https://repository-images.githubusercontent.com/259018719/0663e880-8a02-11ea-9c75-44ca9a90cc1f',
	'2025-07-01'
);

INSERT INTO CURSOS
(
	NOME,
	DESCRICAO,
	CAPA,
	INICIO
)
VALUES
(
	'.NET com C#',
	'Criação de aplicações web e APIs utilizando .NET 6 com C#',
	'https://hermes.dio.me/articles/cover/45ee97d9-537e-43a3-a970-ac825a118710.png',
	'2025-07-03'
);

INSERT INTO CURSOS
(
	NOME,
	DESCRICAO,
	CAPA,
	INICIO
)
VALUES
(
	'Programação com Golang',
	'Desenvolvimento de sistemas e APIs com a linguagem Go (Golang)',
	'https://camo.githubusercontent.com/92a6a28d899f9fcb5d13dc1d65aef6d154327de85d34788b5bb4a89f03686149/68747470733a2f2f7777772e766572746963612e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031392f30372f476f6c616e672e706e67',
	'2025-07-05'
);
```
