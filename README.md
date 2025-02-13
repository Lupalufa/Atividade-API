# Configuração do Projeto

Este projeto utiliza o framework Express para criar um servidor e gerenciar um banco de dados simples em memória. A configuração das variáveis de ambiente é feita utilizando a biblioteca Dotenv.

## Configuração da .env

Para configurar as variáveis de ambiente, crie um arquivo `.env` na raiz do seu projeto e adicione a seguinte linha:

```
PORTA=3000
```

Substitua `3000` pela porta que você deseja utilizar.

## Funcionalidades

### Configuração do Servidor

```javascript
const express = require("express")
const server = express()
const dotenv = require("dotenv")
dotenv.config()
server.use(express.json())
```

- **express**: Importa o framework Express.
- **server**: Cria uma instância do servidor Express.
- **dotenv**: Importa a biblioteca Dotenv para gerenciar variáveis de ambiente.
- **dotenv.config()**: Carrega as variáveis de ambiente do arquivo `.env`.
- **server.use(express.json())**: Configura o servidor para aceitar requisições com corpo em JSON.

### Porta Configurada na .env

```javascript
const port = process.env.PORTA
```

- **port**: Define a porta do servidor a partir da variável de ambiente `PORTA`.

### Banco de Dados em Array

```javascript
const banco_dados = [];
```

- **banco_dados**: Array que armazena os livros cadastrados.

### Função GET (Visualizar)

```javascript
server.get("/", function(req, res) {
    try {
        if (banco_dados.length === 0) {
            return res.status(200).json({ msg: "Não há livros cadastrados" });
        }
        return res.status(200).json(banco_dados);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar livro" });
    }
});
```

- **server.get("/")**: Rota para listar todos os livros cadastrados.
- **res.status(200).json()**: Retorna a lista de livros ou uma mensagem indicando que não há livros cadastrados.
- **res.status(500).json()**: Retorna uma mensagem de erro em caso de falha.

### Função POST (Enviar)

```javascript
server.post("/", function(req, res) {
    try {
        const { id, titulo, autor, genero } = req.body;
        const novoProduto = { id, titulo, autor, genero };
        banco_dados.push(novoProduto);
        return res.status(201).json(novoProduto);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao cadastrar livro" });
    }
});
```

- **server.post("/")**: Rota para cadastrar um novo livro.
- **req.body**: Recebe os dados do novo livro.
- **banco_dados.push(novoProduto)**: Adiciona o novo livro ao array `banco_dados`.
- **res.status(201).json()**: Retorna o livro cadastrado.
- **res.status(500).json()**: Retorna uma mensagem de erro em caso de falha.

### Inicialização do Servidor

```javascript
server.listen(port, function() {
    console.log("Iniciando servidor local");
});
```

- **server.listen(port)**: Inicia o servidor na porta configurada.
- **console.log()**: Exibe uma mensagem no terminal indicando que o servidor foi iniciado.
