


const fontes = []

let imagens = []

for (let i = 0; i < 9; i++) {
    fontes[i] = `./imagens/imagem${i}.png`
    fontes[i+9] = `./imagens/imagem${i}.png`
}

for (let i = 0; i < 18; i++) {
    imagens[i] = document.querySelector(`.btn${i}`)
}

embaralharArray(fontes)

document.addEventListener('click', (e) => {

    let elemento = e.target

    for(let i in imagens) {
        if (elemento.classList.contains(`btn${i}`)) {
            imagens[i].setAttribute('src', fontes[i])
            console.log(i)
        }
        console.log(i)
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
