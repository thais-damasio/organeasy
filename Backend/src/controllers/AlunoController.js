const { Aluno } = require('../models');

// GET: /:id
exports.details = (req, res, next) => {
// var nada = async function() {
//     console.log("teste")
//     const { Aluno } = require('./src/models');
//     var alunos = await Aluno.findAll({ where: { teste: 'oi'}}).catch(err => console.log("DEU ERRO"))
//     console.log("Alunos");
//     console.log(alunos)
// //     next()
// }
// nada()

// Aluno.create({ nome: 'Claudio', email: 'claudio@abc.com.br', senha: '123456', criado_em: new Date() })
//     .then(task => {
//         console.log(task)
//     })
//     .catch(err => {
//         console.log(err)
//     })
    let id = req.params.id;
    res.status(201).send(`Aluno Exibido! ${id}`);
};
exports.post = (req, res, next) => {
    res.status(201).send('Aluno Cadastrado!');
};
exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(201).send(`Aluno atualizado! ${id}`);
};
exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Aluno deletado! ${id}`);
};