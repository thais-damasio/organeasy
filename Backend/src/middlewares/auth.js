
const { ExtractJwt, Strategy } = require('passport-jwt');
const passport = require('passport');
const db = require('../models');

module.exports = function (app) {
    // Função para encontrar usuário por e-mail
    async function findUserByEmail(email, callback) {
        let aluno = await db.Aluno.findOne({
            where: {
                email: email
            }
        })
        .catch(err => callback(err, null));
        callback(null, aluno);
    }

    // Configuraçãoes do jwt
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SESSION_KEY        
    };

    let strategy = new Strategy(jwtOptions, function(jwt_payload, done) {
        findUserByEmail(jwt_payload.email, 
        function(err, user) {
            if (err)
                return done(err, null);

            // usuário inexistente
            if (!user)
                return done(null, false);            
            
            return done(null, user);
        });
    });
  
    passport.use(strategy);
    app.use(passport.initialize());
}
