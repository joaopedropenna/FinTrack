const Meta = require('../models/Meta');

const mockMetas = [
  {
    id: '1',
    titulo: 'Comprar um videogame novo',
    valorAtual: 210.0,
    valorTotal: 350.0,
    porcentagem: 60,
    icone: '🎮',
    cor: '#004590'
  },
  {
    id: '2',
    titulo: 'Bicicleta nova',
    valorAtual: 90.0,
    valorTotal: 600.0,
    porcentagem: 15,
    icone: '🚲',
    cor: '#2b88c0'
  }
];

exports.listarMetas = async (req, res) => {
  try {
    const metas = await Meta.find();
    if (metas && metas.length > 0) {
      return res.json(metas);
    }
    return res.json(mockMetas);
  } catch (error) {
    return res.json(mockMetas);
  }
};

exports.criarMeta = async (req, res) => {
  try {
    const { titulo, valorTotal, valorAtual, icone, cor } = req.body;
    const novaMeta = new Meta({
      titulo,
      valorTotal: parseFloat(valorTotal),
      valorAtual: parseFloat(valorAtual || 0),
      icone: icone || '🎯',
      cor: cor || '#004590'
    });
    await novaMeta.save();
    return res.status(201).json(novaMeta);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar meta' });
  }
};
