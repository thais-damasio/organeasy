const { error, success } = require('../config');
const { Avatar } = require('../models');

// GET: /avatar
exports.index = async (req, res) => {
    try {
        let resHttp = success.ok;
        let avatares = await Avatar.findAll();

        resHttp.response.data = avatares;
        res.status(resHttp.status).json(resHttp.response);
    }
    catch(e){
        let errorHandler = error.customServerError(e);
        res.status(errorHandler.status).send(errorHandler.response);        
    }
}