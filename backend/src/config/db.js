const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fintrack');
    console.log(`[MongoDB] Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB] Erro de conexão: ${error.message}`);
    // Não encerra o processo imediatamente para permitir funcionamento em modo mock/desenvolvimento
  }
};

module.exports = connectDB;
