/*

ESTRUTURA DOS CASOS DOS CASOS DE TESTE
CT01 - Cadastrar Aluno

*/

// Teste de cadastro de aluno
//Utilizando o framework nodeunit
var Aluno = require('../aluno'); //Diretório das informações
module.exports = function(){
  setUp: function(callback){
    this.thais = new Aluno('Thais', 'thais.damasio@sga.pucminas.br', 'bundadecachorro21');
    this.vinicius = new Aluno('Vinicius', 'vinicius.pacheco@sga.pucminas.br', 'harrypotter20');
    callback();
  },
  camposDevemSuportarString: function(test){
    this.thais.name = 'Thais';
    this.thais.email = 'thais.damasio@sga.pucminas.br';

    this.vinicus.name = 'Vinicius';
    this.vinicius.email = 'vinicius.pacheco@sga.pucminas.br';

    test.done();
  },
  naoDeveAceitarNomeComNumero: function(test){
    test.throws(function(){
      this.thais.name = 'Th4is';
    }, Error, "Não existem nomes com números");
    test.done();
  },
  emailSemDominio: function(test){
    test.throws(function(){
      this.vinicius.email = 'vinicius.com'
    }, Error, "E-mail inválido, favor conferir o mesmo");
    test.done();
  },
  tearDown: function (callback) {
    this.thais = undefined;
    this.vinicius = undefined;
    callback();
  }
};