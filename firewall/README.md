# Node-repo

Repositório template para projetos Node.js da Pampec Jr. Neste projeto a imagem Docker configura o ambiente básico com servidor Node.js e banco de dados Postgres.

### Requisitos

Para utilizar este template é necessário ter o docker e docker-compose instalados:

* Documentação do [Docker](https://docs.docker.com/engine/);
* Documentação do [Docker Compose](https://docs.docker.com/compose/).

## Commitlint

* O Projeto conta com o pacote commitlint para padronização das mensagens de commit
* Deve seguir a padronização de commits, exemplos podem ser encontrando no [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0-beta.4/#resumo)

## Eslint 

* Esse projeto conta com Eslint para manter a padronização dos códigos.
* É necessario estar instalando a extensão do VsCode Eslint
    `"eslint.alwaysShowStatus": true,
    "eslint.format.enable": true,
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }`

    `"editor.codeActionsOnSave": {
        "source.fixAll.eslint":true 
    }`

* Não é necessario adicionar as seguintes regras no arquivo settings.json do vscode elas se encontram na pasta .vscode

### Utilização

O Makefile disponível na raiz deste repositório abriga alguns comandos para facilitar a manipulação dos conteiners.

* Caso você troque de usuário depois que o banco tiver sido criado será necessário deletar a pasta.

* `make up`: cria o conteiner(caso não exista build) e inicia o servidor;
* `make stop`: encerra operação do servidor;
* `make restart`: destrói a build atual e incia uma nova build do servidor;
* `make eslint`: realiza correção do eslint no projeto;
* `make remove`: remove o banco de dados;
* `make migrate`: faz as migrations do banco de dados;
* `make seed`: faz as seeds do banco de dados;
* `make undoMigrate`: deleta as migrations do banco de dados;
* `make undoSeed`: deleta as seeds do banco de dados;
* `make createDB`: cria um novo banco de dados;

## Lista de dependências

* Handlebars - Template engine do node;
* Morgan - Logger de requisições;
* Sequelize - ORM para banco de dados;
* Dotenv - Utilizado para váriavies de ambiente;
* Nodemon - Configurado como dependência de desenvolvimento;
* Helmet - Pacote de segurança para servidor;
* Cors - Utilizado para requisiçoes;
* Celebrate - Utilizado para validar as requisições do backend;
* Winston - Utilizado para gerar logs do servidor;

## Sequelize Cli comandos

* npx sequelize migration:generate --name=NOMEMIGRATION - Cria uma nova migration;
* npx sequelize seed:generate --name=NOMESEED - Cria uma nova seed;
* npx sequelize db:migrate - Realiza a migração das tabelas para o banco de dados;
* npx sequelize db:migrate:undo:all - Desfaz todas migrações feitas para o banco de dados;
* npx sequelize db:seed - Realiza a migração de todas seed criadas;
* npx sequelize db:seed:undo:all - Desfaz todas seeds do banco de dados;
* npx sequelize -h - Help do sequelize

## Como rodar o projeto 

Adicione o arquivo .env na raiz do projeto

Instale as dependências do projeto com o comando

`npm install`

Inicie o docker com os seguitens comando 

`docker-compose up ou make up `- OBS: make up roda o docker em segundo plano e não apresenta erros na execução 

Realize as migrations e seeds do projeto com os comandos

`npx sequelize db:migrate ou make migrate`<br>
`npx sequelize db:seed:all ou make seed`

Agora execute o projeto com o comando 

`npm start`

## Referências

* [Iniciando um servidor node](https://medium.com/@pampecjr/criando-e-configurando-servidor-node-js-c67211d7e2f9);
* [Relacionamentos com Sequelize](https://medium.com/@rogeriothe_48115/relacionamentos-com-sequelize-guia-final-2b3baf21b2a1).
* [Documentação do Sequelize](https://sequelize.org/v5/manual/models-usage.html).
* [Como organizar e estruturar projetos com node.js](https://medium.com/@diomalta/como-organizar-e-estruturar-projetos-com-node-js-4845be004899).
* [Commitlint](https://commitlint.js.org/#/)