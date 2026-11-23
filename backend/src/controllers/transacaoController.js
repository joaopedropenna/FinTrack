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

    // Validação dos dados recebidos
    const valorNumerico = Number(valor);

    if (
      typeof descricao !== 'string' ||
      !descricao.trim() ||
      valor === undefined ||
      valor === null ||
      valor === '' ||
      !Number.isFinite(valorNumerico) ||
      valorNumerico <= 0
    ) {
      return res.status(400).json({ error: 'Valor inválido.' });
    }

    try {
      const novaTransacao = new Transacao({
        descricao: descricao.trim(),
        valor: valorNumerico,
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
        descricao: descricao.trim(),
        valor: valorNumerico,
        categoria: categoria || 'Outros',
        tipo: 'Despesa',
        status: 'Pendente',
        data: new Date()
      };

      mockTransacoes.unshift(mockItem);
      return res.status(201).json(mockItem);
    }

  } catch (error) {
    return res.status(500).json({
      error: 'Erro ao registrar transação'
    });
  }
};