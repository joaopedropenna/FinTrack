const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  idade: {
    type: Number,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['Dependente', 'Responsavel'],
    default: 'Dependente'
  },
  cpf: {
    type: String,
    sparse: true // Apenas para Responsavel
  },
  limiteGastoDiario: {
    type: Number,
    default: 50.0 // Conforme protótipo do Figma
  },
  plano: {
    type: String,
    enum: ['Basic', 'Premium'],
    default: 'Basic'
  },
  pontos: {
    type: Number,
    default: 150 // Conforme protótipo do Figma (150 Pontos)
  },
  streakDias: {
    type: Number,
    default: 7 // Conforme protótipo do Figma (7 dias de ofensiva)
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
