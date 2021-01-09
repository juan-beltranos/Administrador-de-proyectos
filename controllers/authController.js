const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');


exports.autenticarUsuario = passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/iniciar-sesion',
        failureFlash: true,
        badRequestMessage: 'Ambos campos son obligatorios'
});

// Funcion para revisar si el usuario esta logueado o no

exports.usuarioAutenticado = (req, res, next) => {

        //Si el usuario esta autenticado, adekante
        if (req.isAuthenticated()) {
                return next();
        }
        //Si no esta autenticado,redirigir al formulario
        return res.redirect('/iniciar-sesion');
}

//Funcion para cerra sesion

exports.cerrarSesion = (req, res) => {
        req.session.destroy(() => {
                res.redirect('/iniciar-sesion');
        })
}

