const { error, success } = require('../config');
const { Atividade, AtividadeCurso, AtividadeLazer, AtividadeMateria, sequelize, Sequelize } = require('../models');
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

        // Não concluídas
        let n_lazer = await AtividadeLazer.findAll({
            attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'count_n_concluida']],
            where: { id_aluno: req.user.id },
            include: [
                {
                    association: 'atividade',
                    attributes: [],
                    where: {
                        [Op.and]: [
                            { concluida: false },
                            sequelize.where(sequelize.fn("month", sequelize.col("data_entrega")), month),
                            sequelize.where(sequelize.fn("year", sequelize.col("data_entrega")), year)
                        ]
                    }
                }
            ]
        });
        let n_curso = await AtividadeCurso.findAll({
            attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'count_n_concluida']],
            include: [
                {
                    association: 'atividade',
                    attributes: [],
                    where: {
                        [Op.and]: [
                            { concluida: false },
                            sequelize.where(sequelize.fn("month", sequelize.col("data_entrega")), month),
                            sequelize.where(sequelize.fn("year", sequelize.col("data_entrega")), year)
                        ]
                    }
                },
                {
                    association: 'curso',
                    required: true,
                    where: { id_aluno: req.user.id },
                    attributes: []
                }
            ]
        });
        let n_materia = await AtividadeMateria.findAll({
            attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'count_n_concluida']],
            include: [
                {
                    association: 'atividade',
                    attributes: [],
                    where: {
                        [Op.and]: [
                            { concluida: false },
                            sequelize.where(sequelize.fn("month", sequelize.col("data_entrega")), month),
                            sequelize.where(sequelize.fn("year", sequelize.col("data_entrega")), year)
                        ]
                    }
                },
                {
                    association: 'materia',
                    required: true,
                    attributes: [],
                    include: [{
                        association: 'curso',
                        required: true,
                        where: { id_aluno: req.user.id },
                    }]
                }
            ]
        });

        // Concluídas
        let lazer = await AtividadeLazer.findAll({
            attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'count_concluida']],
            where: { id_aluno: req.user.id },
            include: [
                {
                    association: 'atividade',
                    attributes: [],
                    where: {
                        [Op.and]: [
                            { concluida: true },
                            sequelize.where(sequelize.fn("month", sequelize.col("data_entrega")), month),
                            sequelize.where(sequelize.fn("year", sequelize.col("data_entrega")), year)
                        ]
                    }
                }
            ]
        });
        let curso = await AtividadeCurso.findAll({
            attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'count_concluida']],
            include: [
                {
                    association: 'atividade',
                    attributes: [],
                    where: {
                        [Op.and]: [
                            { concluida: true },
                            sequelize.where(sequelize.fn("month", sequelize.col("data_entrega")), month),
                            sequelize.where(sequelize.fn("year", sequelize.col("data_entrega")), year)
                        ]
                    }
                },
                {
                    association: 'curso',
                    attributes: [],
                    required: true,
                    where: { id_aluno: req.user.id },
                }
            ]
        });
        let materia = await AtividadeMateria.findAll({
            attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'count_concluida']],
            include: [
                {
                    association: 'atividade',
                    attributes: [],
                    where: {
                        [Op.and]: [
                            { concluida: true },
                            sequelize.where(sequelize.fn("month", sequelize.col("data_entrega")), month),
                            sequelize.where(sequelize.fn("year", sequelize.col("data_entrega")), year)
                        ]
                    }
                },
                {
                    association: 'materia',
                    attributes: [],
                    required: true,
                    include: [{
                        association: 'curso',
                        required: true,
                        attributes: [],
                        where: { id_aluno: req.user.id },
                    }]
                }
            ]
        });

        let data = {
            concluidas: {
                lazer: lazer[0],
                curso: curso[0], 
                materia: materia[0]
            },
            nao_concluidas: {
                lazer: n_lazer[0],
                curso: n_curso[0], 
                materia: n_materia[0]
            }
        };
        let resHttp = success.customSuccess(null, data)
        res.status(resHttp.status).json(resHttp.response);
    }
    catch(e){
        let errorHandler = error.customServerError(e);
        res.status(errorHandler.status).send(errorHandler.response);        
    }
}
