// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Conectar ao MongoDB
const mongoURI = 'mongodb+srv://gaureliorodrigues:paraiba162@gabis.oh10e.mongodb.net/?retryWrites=true&w=majority&appName=gabis'; // Substitua pela string de conexão do MongoDB Atlas

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Defina esquemas e modelos
const ConversationSchema = new mongoose.Schema({
  userId: String,
  messages: [{ type: String }],
  timestamp: { type: Date, default: Date.now }
});

const LoginSchema = new mongoose.Schema({
  userId: String,
  loginTime: { type: Date, default: Date.now }
});

const Conversation = mongoose.model('Conversation', ConversationSchema);
const Login = mongoose.model('Login', LoginSchema);

// Rotas
// Salvar conversa
app.post('/api/conversations', async (req, res) => {
  try {
    const newConversation = new Conversation(req.body);
    await newConversation.save();
    res.status(201).send(newConversation);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Salvar login
app.post('/api/logins', async (req, res) => {
  try {
    const newLogin = new Login(req.body);
    await newLogin.save();
    res.status(201).send(newLogin);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});



async function adicionarUsuario(usuario) {
  const client = new MongoClient(url);
  try {
      await client.connect();
      const db = client.db(ConectaBot);
      const collection = db.collection('usuarios');
      await collection.insertOne(usuario);
  } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
  } finally {
      await client.close();
  }
}
