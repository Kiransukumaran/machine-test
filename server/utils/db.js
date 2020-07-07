const mongoose = require('mongoose');
const { DB_URL } = require('../environments');

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});