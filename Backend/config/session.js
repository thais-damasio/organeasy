const Sequelize = require('sequelize');

module.exports = function(session, app) {
    const SessionStore = require('express-session-sequelize')(session.Store);
    const config = require('./database.js');

    const sequelize = new Sequelize(process.env.NODE_ENV === "production"? config.production : config.development);
    let store = new SessionStore({
        db: sequelize
    });
    let sessionData = {
        secret: process.env.SESSION_KEY,
        store: store, 
        saveUninitialized: true,
        resave: true,
        cookie: {maxAge: 30000}
    };
    app.use(session(sessionData));
}