const express = require('express');
const app = express();
const hbs = require('hbs');

require('dotenv').config();
require('./configs/db.config');


app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use(express.urlencoded({ extended: true }));

const routes = require('./configs/routes.config');
app.use('/', routes);


const port = 3000
app.listen(port, () => console.log('App running at port 3000'));