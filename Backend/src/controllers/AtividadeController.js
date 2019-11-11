const { error, success } = require('../config');
const { Atividade, sequelize, Sequelize } = require('../models');
const Op = Sequelize.Op;

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

exports.atividadesByMonth = async (req, res) => {
    try {
        let month = req.params.mes;
        let year = req.params.ano;

        let atividadesCurso = await Atividade.findAll({
            where: {                
                [Op.and]: [
                    sequelize.where(sequelize.fn("year", sequelize.col("data_entrega")), year),
                    sequelize.where(sequelize.fn("month", sequelize.col("data_entrega")), month)
                ]
            },
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
            where: {                
                [Op.and]: [
                    sequelize.where(sequelize.fn("year", sequelize.col("data_entrega")), year),
                    sequelize.where(sequelize.fn("month", sequelize.col("data_entrega")), month)
                ]
            },
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
            where: {                
                [Op.and]: [
                    sequelize.where(sequelize.fn("year", sequelize.col("data_entrega")), year),
                    sequelize.where(sequelize.fn("month", sequelize.col("data_entrega")), month)
                ]
            },
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

exports.atividadesByWeek = async (req, res) => {
    try {
        let data_atual = new Date(req.params.data);
        let year = data_atual.getFullYear();
        
        let atividadesCurso = await Atividade.findAll({
            where: {                
                [Op.and]: [
                    sequelize.where(sequelize.fn("year", sequelize.col("data_entrega")), year),
                    sequelize.where(sequelize.fn("week", sequelize.col("data_entrega")), sequelize.fn('week', data_atual)),
                ]
            },            
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
            where: {                
                [Op.and]: [
                    sequelize.where(sequelize.fn("year", sequelize.col("data_entrega")), year),
                    sequelize.where(sequelize.fn("week", sequelize.col("data_entrega")), sequelize.fn('week', data_atual)),
                ]
            }, 
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
            where: {                
                [Op.and]: [
                    sequelize.where(sequelize.fn("year", sequelize.col("data_entrega")), year),
                    sequelize.where(sequelize.fn("week", sequelize.col("data_entrega")), sequelize.fn('week', data_atual)),
                ]
            }, 
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

exports.atividadesToday = async (req, res) => {
    try {
        let data_atual = new Date(req.params.data);
        
        let atividadesCurso = await Atividade.findAll({
            where: {
                [Op.and]: [
                    sequelize.where(sequelize.fn("day", sequelize.col("data_entrega")), sequelize.fn('day', data_atual)),
                    sequelize.where(sequelize.fn("month", sequelize.col("data_entrega")), sequelize.fn('month', data_atual)),
                    sequelize.where(sequelize.fn("year", sequelize.col("data_entrega")), sequelize.fn('year', data_atual)),
                ]
            },
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
            where: {
                [Op.and]: [
                    sequelize.where(sequelize.fn("day", sequelize.col("data_entrega")), sequelize.fn('day', data_atual)),
                    sequelize.where(sequelize.fn("month", sequelize.col("data_entrega")), sequelize.fn('month', data_atual)),
                    sequelize.where(sequelize.fn("year", sequelize.col("data_entrega")), sequelize.fn('year', data_atual))
                ]
            },            
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
            where: {
                [Op.and]: [
                    sequelize.where(sequelize.fn("day", sequelize.col("data_entrega")), sequelize.fn('day', data_atual)),
                    sequelize.where(sequelize.fn("month", sequelize.col("data_entrega")), sequelize.fn('month', data_atual)),
                    sequelize.where(sequelize.fn("year", sequelize.col("data_entrega")), sequelize.fn('year', data_atual))
                ]
            },
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

exports.atividadesEstatistcas = async (req, res) => {
    try {
        let month = req.params.mes;
        let year = req.params.ano;

        let atividades = await Atividade.findAll({
            attributes: [[sequelize.fn('COUNT', sequelize.col('concluida')), 'count_concluida']],
            where: {
                [Op.and]: [
                    { concluida: true },
                    sequelize.where(sequelize.fn("month", sequelize.col("data_entrega")), month),
                    sequelize.where(sequelize.fn("year", sequelize.col("data_entrega")), year)
                ]
            }
        });

        let atividadesNaoConcluidas = await Atividade.findAll({
            attributes: [[sequelize.fn('COUNT', sequelize.col('concluida')), 'count_n_concluida']],
            where: {
                [Op.and]: [
                    { concluida: false },
                    sequelize.where(sequelize.fn("month", sequelize.col("data_entrega")), month),
                    sequelize.where(sequelize.fn("year", sequelize.col("data_entrega")), year)
                ]
            }
        });

        let data = {
            atividades: atividades[0],
            nao_concluidas: atividadesNaoConcluidas[0],
        };
        let resHttp = success.customSuccess(null, data)
        res.status(resHttp.status).json(resHttp.response);
    }
    catch(e){
        let errorHandler = error.customServerError(e);
        res.status(errorHandler.status).send(errorHandler.response);        
    }
}
