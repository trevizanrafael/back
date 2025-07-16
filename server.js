const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');


const app = express();
const adapter = new FileSync('db.json'); // banco de dados será o arquivo 'db.json'
const db = low(adapter);

db.defaults({ cadastros: [] }).write();

app.use(express.static('public')); // Serve os arquivos da pasta 'public'
app.use(express.json());           // Permite que o servidor entenda os dados do formulário (em formato JSON)

app.post('/salvar', (req, res) => {
    const { nome, email } = req.body; // Pega o nome e o email enviados pelo formulário

    // Guarda os dados no banco de dados
    db.get('cadastros').push({ nome, email }).write();

    console.log('Dados salvos:', { nome, email });

    // Envia uma resposta de sucesso de volta para o front-end
    res.status(200).json({ mensagem: 'Dados salvos com sucesso!' });
});

// Rota para ENVIAR os dados salvos para o front-end
app.get('/dados', (req, res) => {
    const dados = db.get('cadastros').value(); // .value() pega todos os itens de 'cadastros'
    res.json(dados); // Envia a lista completa como resposta
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});