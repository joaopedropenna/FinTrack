const Transacao = require('../models/Transacao');

// Dados iniciais simulados caso o banco ainda não esteja conectado
let mockTransacoes = [
  { id: '1', descricao: 'Jogos', valor: 70.0, categoria: 'Jogos', tipo: 'Despesa', status: 'Pendente', data: new Date() },
  { id: '2', descricao: 'Comida', valor: 25.0, categoria: 'Comida', tipo: 'Despesa', status: 'Pendente', data: new Date() },
  { id: '3', descricao: 'Cinema', valor: 40.0, categoria: 'Outros', tipo: 'Despesa', status: 'Pendente', data: new Date() }
];

exports.listarTransacoes = async (req, res) => {
  try {
    const transacoes = await Transacao.find().sort({ createdAt: -1 });
    if (transacoes && transacoes.length > 0) {
      return res.json(transacoes);
    }
    return res.json(mockTransacoes);
  } catch (error) {
    return res.json(mockTransacoes);
  }
};

exports.criarTransacao = async (req, res) => {
  try {
    const { descricao, valor, categoria } = req.body;
    if (!descricao || !valor) {
      return res.status(400).json({ error: 'Descrição e valor são obrigatórios.' });
    }

    try {
      const novaTransacao = new Transacao({
        descricao,
        valor: parseFloat(valor),
        categoria: categoria || 'Outros',
        tipo: 'Despesa',
        status: 'Pendente' // Vai para aprovação dos pais (RF08)
      });
      await novaTransacao.save();
      return res.status(201).json(novaTransacao);
    } catch (dbErr) {
      // Fallback em memória
      const mockItem = {
        id: String(Date.now()),
        descricao,
        valor: parseFloat(valor),
        categoria: categoria || 'Outros',
        tipo: 'Despesa',
        status: 'Pendente',
        data: new Date()
      };
      mockTransacoes.unshift(mockItem);
      return res.status(201).json(mockItem);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar transação' });
  }
};
