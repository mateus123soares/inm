require('dotenv').config();
require('./events/apiAlert');
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
/*eslint-disable */
const winston = require('./config/winston');
/* eslint-enable */

const app = express();

// Configurando helmet
app.use(helmet());
// Configurando o cors
app.use(cors());
// Configurando o Morgan
app.use(morgan('combined', { stream: winston.stream }));
// Configurando o Body-parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Configurando as rotas

app.use('/', require('./router/index'));
app.use('/firewall', require('./router/firewall'));
app.use('/zabbix', require('./router/zabbix'));

app.use(errors());

module.exports = app;
