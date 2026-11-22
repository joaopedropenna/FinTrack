require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const transacaoRoutes = require('./routes/transacaoRoutes');
const metaRoutes = require('./routes/metaRoutes');
const aprovacaoRoutes = require('./routes/aprovacaoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
connectDB();

// Rotas da API
app.use('/api/transacoes', transacaoRoutes);
app.use('/api/metas', metaRoutes);
app.use('/api/aprovacoes', aprovacaoRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'FinTrack API',
    version: '1.0.0',
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`[FinTrack Backend] Servidor rodando na porta ${PORT}`);
  console.log(`[FinTrack Backend] Health check: http://localhost:${PORT}/api/health`);
});
