// Declaração das variáveis necessárias
const fontes = []
const imagens = []
const botoes = []
let ultimaImagem = ""
let ultimoBotao = ""
let pares = 0
let tentativas = 0
let bonusPorTentativas = 0
let bonusTempo = 0
let primeiro = true
let ocupado = false
let cronometroAtivado = false
let placar = document.querySelector('.pontos')
let textoTempo = document.querySelector('.cronometro')
let finaliza = document.createElement('div');
// Colocando o arquivo fontes das imagens
for (let i = 0; i < 9; i++) {
    fontes[i] = `./imagens/imagem${i}.png`
    fontes[i+9] = `./imagens/imagem${i}.png`
}
// Iniciando as variáveis das imagens e dos botões
for (let i = 0; i < 18; i++) {
    imagens[i] = document.querySelector(`.btn${i}`)
    botoes[i] = false
}
// Embaralhando as imagens
embaralharArray(fontes)
// Capturando o click
document.addEventListener('click', (e) => {
    // Seleciona o botão clicado
    let elemento = e.target
    for(let i in imagens) {
        if (elemento.classList.contains(`btn${i}`)) {
            // Programando as ações da primeira carta clicada
            if (primeiro && !botoes[i] && !ocupado) {
                // Começa a conta o tempo
                if (!cronometroAtivado) {
                    start()
                }
                ocupado = true
                imagens[i].setAttribute('src', fontes[i])
                ultimaImagem = fontes[i]
                ultimoBotao = i
                primeiro = false
                ocupado = false
            // Programando as ações da segunda carta clicada
            } else if (!primeiro && !botoes[i] && !ocupado && ultimoBotao !== i) {
                ocupado = true
                botoes[i] = true
                botoes[ultimoBotao] = true
                imagens[i].setAttribute('src', fontes[i])
                // Programando o delay
                setTimeout(function() {
                    // Se as carta forma iguais executa essas ações 
                    if (ultimaImagem === fontes[i]) {
                        pares++
                        tentativas++
                        atualizarPontos()
                        finalizar()
                        primeiro = true
                        ocupado = false
                    // Se as cartas forma diferentes executas essas ações
                    } else {
                        imagens[i].setAttribute('src', './imagens/carta.png')
                        imagens[ultimoBotao].setAttribute('src', './imagens/carta.png')
                        botoes[i] = false
                        botoes[ultimoBotao] = false
                        tentativas++
                        primeiro = true
                        ocupado = false
                    }
                }, 2000);
            }
        }
    }
    // Programa o botão reiniciar
    if (elemento.classList.contains(`reiniciar`)) {
        reset()
        for (let i in imagens) {
            imagens[i].setAttribute('src', './imagens/carta.png')
            botoes[i] = false
        }
        ultimaImagem = ""
        ultimoBotao = ""
        pares = 0
        tentativas = 0
        bonusPorTentativas = 0
        bonusTempo = 0
        primeiro = true
        ocupado = false
        cronometroAtivado = false
        embaralharArray(fontes)
        atualizarPontos()
        finaliza.innerHTML = ""
    }
})
// Função que atualiza os pontos
function atualizarPontos() {
    let pontos = pares * 100
    placar.innerHTML = "Pontos: " + String(pontos)
}
// Função que embaralha um array
function embaralharArray(array) {
    // Loop em todos os elementos
    for (let i = array.length - 1; i > 0; i--) {
    // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [array[i], array[j]] = [array[j], array[i]];
    }
}
// Função que finaliza o jogo
function finalizar() {
    // Se os pares forem igual a 9 finaliza o jogo
    if (pares == 9) {
        console.log(segundos)
        pause()
        // Marca os pontos
        if (tentativas < 15) {
            bonusPorTentativas += 1500
        } else if (tentativas < 25) {
            bonusPorTentativas += 1000
        } else if (tentativas < 40) {
            bonusPorTentativas += 500
        }
        if (segundos < 30 && minutos === 0) {
            bonusTempo += 1500
        } else if (minutos < 1) {
            bonusTempo += 1000
        } else if (minutos < 2) {
            bonusTempo += 500
        }
        setTimeout(() => {
            // Cria uma div para mostrar a pontuação final
            finaliza.innerHTML = `<div class='finalizar'><p>Bônus por pares: ${pares * 100}</p>`
                    +`<p>Bônus por tentativas: ${bonusPorTentativas}</p>`
                    +`<p>Bônus pelo tempo: ${bonusTempo}</p>`
                    +`<br><p>Pontuação Total: ${bonusTempo + bonusPorTentativas + (pares*100)}</p>`
                    +"<button class='reiniciar'>Reiniciar</button></div>"
            document.body.appendChild(finaliza)
        }, 1500)
    }
}





