
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

## Lista de dependências

* Morgan - Logger de requisições;
* Dotenv - Utilizado para váriavies de ambiente;
* Nodemon - Configurado como dependência de desenvolvimento;
* Helmet - Pacote de segurança para servidor;
* Cors - Utilizado para requisiçoes;
* Winston - Utilizado para gerar logs do servidor;

## Como rodar o projeto 

Adicione o arquivo .env na raiz do projeto

```
PORT=
PATH_RULES=
CRONJOB_RULE=
```

Instale as dependências do projeto com o comando

`npm install`

Agora execute o projeto com o comando 

`npm start`

## Referências

* [Iniciando um servidor node](https://medium.com/@pampecjr/criando-e-configurando-servidor-node-js-c67211d7e2f9);
* [Relacionamentos com Sequelize](https://medium.com/@rogeriothe_48115/relacionamentos-com-sequelize-guia-final-2b3baf21b2a1).
* [Documentação do Sequelize](https://sequelize.org/v5/manual/models-usage.html).
* [Como organizar e estruturar projetos com node.js](https://medium.com/@diomalta/como-organizar-e-estruturar-projetos-com-node-js-4845be004899).
* [Commitlint](https://commitlint.js.org/#/)