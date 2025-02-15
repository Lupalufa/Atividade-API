const express = require("express")
const dotenv = require("dotenv")
const server = express()

const port = process.env.PORTA

dotenv.config()
server.use(express.json())

const banco_dados = []

server.get("/pets", function(req,res){
    try {
        if(banco_dados.length === 0){
            return res.status(200).json({msg: "Não há pets cadastrados aqui"})
        }
        return res.status(200).json(banco_dados)
    } catch (error) {
        res.status(500).json({msg: "Erro ao buscar pets"})
    }
})

server.post("/pets", function(req,res){
    try {
        const {id, nome, especie, raca, status, dono} = req.body
        const novoPet = {id, nome, especie, raca, status, dono}
        banco_dados.push(novoPet)
        return res.status(201).json(novoPet)
    } catch (error) {
        res.status(500).json({msg: "Erro ao cadastrar pet"})
    }
})

server.put("/pets/:id", function(req,res){
    try {
        const id = req.params
        const pet = banco_dados.find(pet => pet.id === id)
        if(!pet){
            return res.status(404).json({msg: "Pet não encontrado"})
        }
        const {novoNome, novaEspecie, novaRaca, novoStatus, novoDono} = req.body;
        if(pet){
            pet.nome = novoNome
            pet.especie = novaEspecie
            pet.raca = novaRaca
            pet.status = novoStatus
            pet.dono = novoDono
        }
        res.status(200).json(pet)
    } catch (error) {
        res.status(500).json({msg: "Erro ao atualizar Pet"})
    }
})

server.delete("/pets/:id", function(req,res){
    try {
        const id = req.params
        const index = banco_dados.findIndex(pet => pet.id === id)
        if(index !== -1){
            banco_dados.splice(index, 1)
            res.json({msg: "Pet deletado com sucesso"})
        }
        else {
            res.status(404).json({msg: "Pet não encontrado"})
        }
    } catch (error) {
        res.status(500).json({msg: "Erro ao deletar pet"})
    }
})

server.listen(port, function(){
    console.log("Iniciando servidor local")
})