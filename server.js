const express = require("express")
const server = express()


// Configuração da Dotenv e servidor
const dotenv = require("dotenv")
dotenv.config()
server.use(express.json())

// Porta configurada na .env
const port = process.env.PORTA

// Banco de dados em Array
const banco_dados = [];

// Função Get (visualizar) para listar todos os livro 
server.get("/", function(req,res){
    try {
        if(banco_dados.length === 0){
            return res.status(200).json({msg: "Não há livros cadastrados"})
        }
        return res.status(200).json(banco_dados)
    } catch (error) {
        res.status(500).json({msg: "Erro ao buscar livro"})
    }
});

// Função Post (Enviar) o livro para o banco de dados
server.post("/", function(req,res){
    try {
        const {id, titulo, autor, genero} = req.body
        const novoProduto = {id, titulo, autor, genero}
        banco_dados.push(novoProduto)
        return res.status(201).json(novoProduto)
    } catch (error) {
        res.status(500).json({msg: "Erro ao cadastrar livro"})
    }
});























// Rota para a porta com mensagem de exibição no terminal
server.listen(port, function(){
    console.log("Iniciando servidor local")
})