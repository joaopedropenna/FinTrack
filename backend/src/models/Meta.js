const mongoose = require('mongoose');

const MetaSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  valorAtual: {
    type: Number,
    required: true,
    default: 0.0
  },
  valorTotal: {
    type: Number,
    required: true
  },
  icone: {
    type: String,
    default: 'gamepad' // gamepad, bike, etc.
  },
  cor: {
    type: String,
    default: '#004590'
  }
}, {
  timestamps: true
});

MetaSchema.virtual('porcentagem').get(function() {
  if (!this.valorTotal || this.valorTotal === 0) return 0;
  return Math.round((this.valorAtual / this.valorTotal) * 100);
});

module.exports = mongoose.model('Meta', MetaSchema);
