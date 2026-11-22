const mongoose = require('mongoose');

const TransacaoSchema = new mongoose.Schema({
  contaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conta'
  },
  descricao: {
    type: String,
    required: true,
    trim: true
  },
  valor: {
    type: Number,
    required: true
  },
  categoria: {
    type: String,
    enum: ['Compras', 'Jogos', 'Comida', 'Transporte', 'Presente', 'Outros'],
    default: 'Outros'
  },
  tipo: {
    type: String,
    enum: ['Despesa', 'Receita'],
    default: 'Despesa'
  },
  status: {
    type: String,
    enum: ['Pendente', 'Aprovada', 'Negada'],
    default: 'Pendente' // Transações de dependentes iniciam em Pendente para aprovação dos pais (RF08)
  },
  data: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transacao', TransacaoSchema);
