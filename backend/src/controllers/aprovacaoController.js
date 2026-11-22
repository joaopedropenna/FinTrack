const Transacao = require('../models/Transacao');

// Mocks iniciais sincronizados com a tela de Controle dos Pais do Figma
let mockPendentes = [
  { id: '1', descricao: 'Jogos', valor: 70.0, categoria: 'Jogos', icone: '🎮' },
  { id: '2', descricao: 'Comida', valor: 25.0, categoria: 'Comida', icone: '🍴' },
  { id: '3', descricao: 'Cinema', valor: 40.0, categoria: 'Cinema', icone: '🎬' }
];

exports.listarPendentes = async (req, res) => {
  try {
    const pendentes = await Transacao.find({ status: 'Pendente' });
    if (pendentes && pendentes.length > 0) {
      return res.json(pendentes);
    }
    return res.json(mockPendentes);
  } catch (error) {
    return res.json(mockPendentes);
  }
};

exports.aprovarTransacao = async (req, res) => {
  const { id } = req.params;
  try {
    const transacao = await Transacao.findByIdAndUpdate(id, { status: 'Aprovada' }, { new: true });
    if (transacao) {
      return res.json({ message: 'Transação aprovada com sucesso!', transacao });
    }
    mockPendentes = mockPendentes.filter(item => item.id !== id);
    return res.json({ message: 'Transação aprovada com sucesso (mock)!', id });
  } catch (error) {
    mockPendentes = mockPendentes.filter(item => item.id !== id);
    return res.json({ message: 'Transação aprovada com sucesso (fallback)!', id });
  }
};

exports.negarTransacao = async (req, res) => {
  const { id } = req.params;
  try {
    const transacao = await Transacao.findByIdAndUpdate(id, { status: 'Negada' }, { new: true });
    if (transacao) {
      return res.json({ message: 'Transação negada.', transacao });
    }
    mockPendentes = mockPendentes.filter(item => item.id !== id);
    return res.json({ message: 'Transação negada (mock).', id });
  } catch (error) {
    mockPendentes = mockPendentes.filter(item => item.id !== id);
    return res.json({ message: 'Transação negada (fallback).', id });
  }
};
