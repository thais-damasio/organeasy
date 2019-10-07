/*

ESTRUTURA DOS CASOS DOS CASOS DE TESTE
CT02 - Aluno efetuar login

*/

// Teste de cadastro de aluno
//Utilizando o framework nodeunit
var Aluno = require('../aluno'); //Diretório das informações
module.exports = function(){
  setUp: function(callback){
    this.vinicius = new Aluno('Vinicius', 'vinicius.pacheco@sga.pucminas.br', 'harrypotter20');
    callback();
  },
  senhaCorreta: function(test){
      test.throws(function(){
        this.vinicus.senha = 'harrypotter20';
      }, Error, "Senha incorreta");

    test.done();
  },
  emailCorreto: function(test){
    test.throws(function(){
        this.vinicius.email = 'vinicius@puc.com';
    }, Error, "E-mail não encontrado");
    test.done();
  },
  tearDown: function (callback) {
 0  this.vinicius = undefined;
    callback();
  }
};