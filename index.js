const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');


// Importar las variables
require('dotenv').config({ path: 'variables.env' })

//Helpers con algunas funciones
const helpers = require('./helpers');

// Crear la conexion a la BD

const db = require('./config/db');
const session = require('express-session');

// importar el modelo

require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then(() => console.log('conectado al servidor'))


// Crear una app de express
const app = express();

// Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Dodne cargar los archivos estaticos
app.use(express.static('public'));

// Habilitar pug
app.set('view engine', 'pug');

//Agregar flash
app.use(flash());

app.use(cookieParser());

//Sesiones nos permiten navegar sin volvernos a identificar
app.use(session({
    secret: 'superSecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Pasar vardump a la app
app.use((req, res, next) => {

    res.locals.vardumb = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = { ...req.user } || null;

    next();
});

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));


app.use('/', routes());


// servifor y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port,host, ()=> {
    console.log('El servidor esta funcionando!');
});