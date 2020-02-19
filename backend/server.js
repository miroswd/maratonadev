// Configurando o servidor
const express = require('express')
const server = express();



/* Agora está pegando do banco de dados
// Lista de doadores -> Array
const donors = [
    {
        name:"Miroswd",
        blood:"A+",
    },
    {
        name:"Cleytin",
        blood:"AB",
    },
    {
        name:"Diego Fernandes",
        blood:"O+",
    },
    {
        name:"Mayk Brito",
        blood:"A+",
    },
]*/


// Configurando o servidor para apresentar arquivos estáticos
// arquivos estáticos (css, js, img, etc) ficam na pasta public

server.use(express.static('../public'))

// middleware -> ação no meio do caminho
// Habiltar o body do formulário
server.use(express.urlencoded({extended:true})) // Deixe com mais poderes, permita o uso do body

// Configurando a conexão com o banco de dados
const Poll = require('pg').Pool // Mantém a conexão ativa, sem ter q ficar fazendo login
const db = new Poll({
    user:'postgres',
    password:'0000',
    host:'localhost',
    port:5432,
    database:'doe',
}); // Criando um novo objeto


// Configurando a template engine
const nunjucks = require('nunjucks')
nunjucks.configure('../',{
    // propriedade e valor
    express:server,
    noCache:true
}) // Caminho do arquivo que será utilizado

// Configurando a apresentação da página
server.listen(3000, function(){
    console.log('Servidor inicializado')
}) // Iniciando o servidor

server.get('/',function(req,res){
    // const donors = [];
    db.query("SELECT * FROM donors", function(err,result){
        if(err) return res.send("Erro no banco")

        const donors = result.rows; // Dados da linha da tabela
        return res.render('index.html',{
            // valor:"Qualquer valor"
            donors
        })
    })
})

// Recebendo dados do formulário

server.post('/',function(req,res){
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if(name==""||email==""||blood==""){
        return res.send("Todos os campos são obrigatórios")
    }

    // Colocando valores no db
    const query = `
        INSERT INTO donors ("name","email","blood")
        VALUES ($1,$2,$3)`
    
    const values = [name,email,blood]

    db.query(query,values,function(err){
        // Fluxo de erro
        if(err) return res.send("Erro no banco de dados")

        // Fluxo ideal
        return res.redirect('/')

    })

    // Colocando valores debtro do array
    // donors.push({name,email,blood})

})