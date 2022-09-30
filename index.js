


const fontes = []

let imagens = []

let botoes = []

let ultimaImagem = ""
let ultimoBotao = ""
let pares = 0
let tentativas = 0
let primeiro = true
let ocupado = false

for (let i = 0; i < 9; i++) {
    fontes[i] = `./imagens/imagem${i}.png`
    fontes[i+9] = `./imagens/imagem${i}.png`
}

for (let i = 0; i < 18; i++) {
    imagens[i] = document.querySelector(`.btn${i}`)
    botoes[i] = false

}

embaralharArray(fontes)

document.addEventListener('click', (e) => {

    let elemento = e.target

    for(let i in imagens) {
        if (elemento.classList.contains(`btn${i}`)) {

            if (primeiro && !botoes[i] && !ocupado) {
                ocupado = true
                imagens[i].setAttribute('src', fontes[i])
                ultimaImagem = fontes[i]
                ultimoBotao = i
                primeiro = false
                ocupado = false
            } else if (!primeiro && !botoes[i] && !ocupado && ultimoBotao !== i) {
                console.log("chegou aqui")
                ocupado = true
                botoes[i] = true
                botoes[ultimoBotao] = true
                imagens[i].setAttribute('src', fontes[i])
                setTimeout(function() { 
                    if (ultimaImagem === fontes[i]) {
                        pares++
                        tentativas++
                        primeiro = true
                        ocupado = false
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

})



function embaralharArray(array) {
    // Loop em todos os elementos
    for (let i = array.length - 1; i > 0; i--) {
    // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [array[i], array[j]] = [array[j], array[i]];
}
}
