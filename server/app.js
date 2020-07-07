const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('./utils/db');
const auth = require('./routes/auth');
const user = require('./routes/user');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());


app.use('/auth', auth);
app.use('/user', user);


module.exports = app;
