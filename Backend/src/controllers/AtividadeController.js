const { error, success } = require('../config');
const { Atividade } = require('../models');

// GET: /
exports.index = async (req, res) => {
    try {
        let atividadesCurso = await Atividade.findAll({
            include: [
                {
                    association: 'atividadesCurso',
                    required: true,
                    include: [
                        {
                            association: 'curso',
                            required: true,
                            where: {id_aluno: req.user.id}
                        }
                    ]
                }
            ]
        });

        let atividadesMateria = await Atividade.findAll({
            include: [
                {
                    association: 'atividadesMateria',
                    required: true,
                    include: [
                        {
                            association: 'materia',
                            include: [
                                {
                                    association: 'curso',
                                    required: true,
                                    where: {id_aluno: req.user.id}
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        let atividadesLazer = await Atividade.findAll({
            include: [                
                {
                    association: 'atividadesLazer',
                    required: true,
                    where: {id_aluno: req.user.id}
                }
            ]
        }); 

        let data = {
            atividadesCurso: atividadesCurso,
            atividadesLazer: atividadesLazer,
            atividadesMateria: atividadesMateria
        };
        let resHttp = success.customSuccess(null, data)
        res.status(resHttp.status).json(resHttp.response);
    }
    catch(e){
        let errorHandler = error.customServerError(e);
        res.status(errorHandler.status).send(errorHandler.response);        
    }
}
