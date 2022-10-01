// Declaração das varáveis necessárias
let minutos = 0;
let segundos = 0;
let milisegundos = 0;
let cron
// Função que começa o cronômetro
function start() {
    pause();
    cron = setInterval(() => { timer(); }, 10);
  }
// Função que pausa o cronômetro
function pause() {
    clearInterval(cron);
}
// Função que reseta o cronômetro
function reset() {
    minutos = 0;
    segundos = 0;
    milisegundos = 0;
    document.getElementById('minuto').innerText = '00';
    document.getElementById('segundo').innerText = '00';
}
// Função que transforma os milisegundos
function timer() {
    if ((milisegundos += 10) == 1000) {
      milisegundos = 0;
      segundos++;
    }
    if (segundos == 60) {
      segundos = 0;
      minutos++;
    }
    document.getElementById('minuto').innerText = returnData(minutos);
    document.getElementById('segundo').innerText = returnData(segundos);
}
// Deixa o texto mais dinâmico na tela
function returnData(input) {
    return input > 10 ? input : `0${input}`
}

  