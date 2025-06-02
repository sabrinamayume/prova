var http = require('http');
var express = require('express');
var app = express();
const bodyparser = require('body-parser');
var mongodb = require("mongodb");

app.use(express.static('./public'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

var server = http.createServer(app);
server.listen(80);
console.log('Servidor rodando...');

const MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://sabrina:may123@cluster0.tlphc9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect().then(() => {
    const dbo = client.db("alunos");
    const colecao = dbo.collection("notas");

    app.post('/cadastrar', function (req, res) {
        const { nome, nota1, nota2, nota3 } = req.body;
        const dados = { nome, nota1, nota2, nota3 };

        colecao.insertOne(dados, function (err) {
            if (err) {
                res.render('resposta_media_erro', { nome });
            } else {
                res.redirect('/pagina'); // redireciona para listagem
            }
        });
    });

    app.get('/cadastrar', function (req, res) {
        colecao.find({}).toArray(function (err, result) {
            if (err) {
                res.status(500).json({ erro: 'Erro ao buscar dados' });
            } else {
                res.status(200).json(result);
            }
        });
    });

    app.get('/pagina', function (req, res) {
        res.render('pagina');
    });

    app.get('/media', function (req, res) {
        const nomeAluno = req.query.aluno_media;

        colecao.findOne({ nome: nomeAluno }, (err, usuario) => {
            if (err || !usuario) {
                res.render('resposta_media_erro', { nome: nomeAluno });
            } else {
                const nota1 = parseFloat(usuario.nota1);
                const nota2 = parseFloat(usuario.nota2);
                const nota3 = parseFloat(usuario.nota3);
                const media = ((nota1 + nota2 + nota3) / 3).toFixed(2);

                res.render('resposta_media_sucesso', { nome: nomeAluno, media });
            }
        });
    });

});
