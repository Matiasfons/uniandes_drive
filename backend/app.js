const express = require('express');
const routesFolders = require('./api/folders/routes');
const routesRegister = require("./api/register/register");
const routesLogin = require("./api/login/login");

var cors = require('cors')
require('dotenv').config();
let port = process.env.SERVER_PORT;
//SERVER
const app = express();
app.use(cors());
app.use(express.json());
app.use('/login', routesLogin);
app.use('/register', routesRegister);
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
