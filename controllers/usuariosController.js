
const Usuarios = require('../models/Usuarios');


exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crear cuenta '
    })
}
exports.formIniciarSesion = (req, res) => {
    const { error } = res.locals.mensajes;
    res.render('iniciar-sesion', {
        nombrePagina: 'Iniciar sesion ',
        error
    })
}

exports.crearCuenta = async (req, res) => {

    // leer los datos
    const { email, password } = req.body;

    try {
        //Crear el usuario
        await Usuarios.create({
            email,
            password
        })
        res.redirect('/iniciar-sesion');

    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('crear-cuenta', {
            mensajes: req.flash(),
            nombrePagina: 'Crear cuenta ',
            email,
            password
        })
    }
}

