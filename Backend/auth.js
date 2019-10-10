
const LocalStrategy = require('passport-local').Strategy
const db = require('./src/models');

module.exports = function (passport) {
    // Função para encontrar usuário por nome
    async function findUser(username, callback) {
        let aluno = await db.Aluno.findOne({
            where: {
                email: username
            }
        })
        .catch(err => callback(err, null));
        
        callback(null, aluno);
    }

    // Função para encontrar usuário por id
    async function findUserById(id, callback) {
        let aluno = await db.Aluno.findOne({
            where: {
                id: id
            }
        })
            .catch(err => callback(err, null));
        callback(null, aluno);
    }

    //Serialize sessions
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    //Deserialize sessions
    passport.deserializeUser(function (id, done) {
        findUserById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha'
    },
        (username, password, done) => {
            findUser(username, (err, user) => {
                if (err) { return done(err) }

                // usuário inexistente
                if (!user) { return done(null, false) }
                
                // comparando as senhas
                if(user.validPassword(password))
                    return done(null, user)
                else
                    return done(null, false)
            })
        }
    ));
}