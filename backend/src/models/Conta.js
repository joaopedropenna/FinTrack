const mongoose = require('mongoose');

const ContaSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  saldo: {
    type: Number,
    default: 148.75 // Conforme valor inicial do protótipo
  },
  rendimentoSemanal: {
    type: Number,
    default: 24.50 // "+ R$ 24,50 esta semana" do Figma
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Conta', ContaSchema);
