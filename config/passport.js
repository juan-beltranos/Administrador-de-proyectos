const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

//Referencia al modelo donde vamos a auntenticar
const Usuarios = require('../models/Usuarios');

//local strategy - login con credenciales propias (usuarios-password)

passport.use(
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {

            try {
                const usuario = await Usuarios.findOne({
                    where: { email: email }
                });
                // El usuario existe, password incorrecto
                if (!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'Password incorrecto'
                    });
                }
                // El email existe y el password es incorrecto
                return done(null, usuario);
            } catch (error) {
                //Ese usuario no existe
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                });
            }
        }
    )
);
// Serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});
// Deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

// Exportar
module.exports = passport;