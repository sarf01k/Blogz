const express = require('express');
require("dotenv").config();
const morgan = require('morgan');
const dbConnection = require('./db')

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const port = process.env.PORT;

dbConnection();
app.use('/', require('./postRoutes'));

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})