
const mongoose = require('mongoose');
const Transacao = require('../models/Transacao');

// Lista as despesas pendentes de aprovação
exports.listarPendentes = async (req, res) => {
  try {
    const pendentes = await Transacao.find({
      tipo: 'Despesa',
      status: 'Pendente'
    }).sort({ data: -1 });

    return res.status(200).json(pendentes);

  } catch (error) {
    console.error('Erro ao listar despesas pendentes:', error);

    return res.status(500).json({
      error: 'Não foi possível listar as despesas pendentes.'
    });
  }
};

// Atualiza o status de uma despesa
const atualizarStatus = async (req, res, novoStatus) => {
  const { id } = req.params;

  // Valida o ID recebido pela URL
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: 'ID da despesa inválido.'
    });
  }

  try {
    // Atualiza somente despesas que ainda estão pendentes
    const transacao = await Transacao.findOneAndUpdate(
      {
        _id: id,
        tipo: 'Despesa',
        status: 'Pendente'
      },
      {
        $set: { status: novoStatus }
      },
      {
        new: true,
        runValidators: true
      }
    );

    // Verifica se a despesa foi encontrada
    if (!transacao) {
      const existente = await Transacao.findById(id);

      if (!existente) {
        return res.status(404).json({
          error: 'Despesa não encontrada.'
        });
      }

      if (existente.tipo !== 'Despesa') {
        return res.status(400).json({
          error: 'Apenas despesas podem ser aprovadas ou negadas.'
        });
      }

      return res.status(409).json({
        error: 'Esta despesa já foi processada.'
      });
    }

    const acao = novoStatus === 'Aprovada'
      ? 'aprovada'
      : 'negada';

    return res.status(200).json({
      message: `Despesa ${acao} com sucesso!`,
      transacao
    });

  } catch (error) {
    console.error('Erro ao atualizar despesa:', error);

    return res.status(500).json({
      error: 'Erro interno ao atualizar a despesa.'
    });
  }
};

// Aprovar despesa
exports.aprovarTransacao = (req, res) => {
  return atualizarStatus(req, res, 'Aprovada');
};

// Negar despesa
exports.negarTransacao = (req, res) => {
  return atualizarStatus(req, res, 'Negada');
};

