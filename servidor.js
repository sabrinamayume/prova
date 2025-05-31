var http = require('http');
var express = require('express');
var app = express();
//servir arquivos da pasta public
app.use(express.static('./public'));

//body-parser para ler os dados do formulario
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//iniciar servidor na porta escolhida
var server = http.createServer(app);
server.listen(80);
console.log('Servidor rodando...');

//conexão com o mongo
var mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://sabrina:may123@cluster0.tlphc9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect()
    const dbo = client.db("alunos");
    const colecao = dbo.collection("notas");

    app.post('/cadastrar', function (req, res) {
        console.log("Dados recebidos:", req.body);

        const aluno = req.body.nome;
        const nota1 = req.body.nota1;
        const nota2 = req.body.nota2;
        const nota3 = req.body.nota3;

        const dados = {
            nome : aluno,
            nota1 : nota1,
            nota2 : nota2,
            nota3 : nota3
        };

        colecao.insertOne(dados, function (err) {
            if (err) {
                res.status(500).send('erro');
            } else {
                res.status(200).send('sucesso');
            }
        });
    });


//sabrina
//MJRpU4OX7AijPfmN