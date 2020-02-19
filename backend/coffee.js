// Fazer café

function verificarSeOCopoEstaSujo(situacao){
    // Lógica para verificar se o copo está sujo
    return `Teu copo tá ${situacao} menó`
}

const copo = {
    cor:"Branco",
    tamanho: 2.5,
    verificarSeOCopoEstaSujo,
}

console.log(copo.verificarSeOCopoEstaSujo('sujo'))