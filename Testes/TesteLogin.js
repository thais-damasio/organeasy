var webdriver = require('selenium-webdriver');

// Input capabilities
var capabilities = {
 'browserName' : 'Chrome',
 'browser_version' : '78.0',
 'os' : 'Windows',
 'os_version' : '10',
 'resolution' : '1024x768',
 'browserstack.user' : 'luizfelipe14',
 'browserstack.key' : 'HdpsxYJLEPinErvg2Esi',
 'name' : 'Bstack-[Node] Sample Test'
}

console.log("Tentando efetuar login...");
console.log("Retorne o título da página, caso a validação funcione!")

var driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

var url = 'https://organeasy.herokuapp.com/#/login';


//Login: luiz.araujo@sga.pucminas.br
//Senha: tecweb10   

driver.get(url).then(function(){
  driver.findElement(webdriver.By.className('uk-input')).sendKeys('luiz.araujo@sga.pucminas.br').then(function(){
        driver.findElement(By.xpath("//input[@placeholder='Senha']")).sendKeys('tecweb10').then(function(){
        driver.findElement(webdriver.By.className('uk-button uk-button-primary')).click().then(function(){
            console.log(title);
            console.log("Você efetuou login!");
            driver.quit();
        })
    });
  }).catch(function(erro){
    console.log("Teste falhou, motivo: " + erro)
  })
});