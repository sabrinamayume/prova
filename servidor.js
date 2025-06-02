var http = require('http');
var express = require('express');
var app = express();
app.use(express.static('./public'));
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
var server = http.createServer(app);
server.listen(80);
console.log('Servidor rodando...');
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
                res.redirect('/resposta_media_erro.html');
            } else {
                res.redirect('/resposta_media_sucesso.html');
            }
        });
    });
    app.get('/cadastrar', function (req, res) {
    colecao.find({}).toArray(function (err, result) {
        if (err) {
            res.redirect('/resposta_media_erro.html');
        } else {
            res.status(200).json(result); // envia os dados como JSON
        }
    });
});
