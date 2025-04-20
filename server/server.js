const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Carrega as variáveis de ambiente
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rota para enviar mensagem do WhatsApp
app.post('/api/send-whatsapp', async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;
    
    if (!phoneNumber || !message) {
      return res.status(400).json({ error: 'Número de telefone e mensagem são obrigatórios' });
    }
    
    // Remove qualquer formatação do número de telefone
    const formattedPhone = phoneNumber.replace(/\D/g, '');
    
    // Configuração para a API do WhatsApp
    const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
    const headers = {
      'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
      'Content-Type': 'application/json'
    };
    
    // Dados para enviar a mensagem
    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: formattedPhone,
      type: "text",
      text: {
        preview_url: false,
        body: message
      }
    };
    
    // Fazer a requisição para a API do WhatsApp
    const response = await axios.post(url, data, { headers });
    
    console.log('Mensagem enviada com sucesso:', response.data);
    return res.status(200).json({ success: true, data: response.data });
    
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error.response?.data || error.message);
    return res.status(500).json({ 
      error: 'Erro ao enviar mensagem', 
      details: error.response?.data || error.message 
    });
  }
});

// Rota de teste para verificar se o servidor está funcionando
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Servidor funcionando!' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
