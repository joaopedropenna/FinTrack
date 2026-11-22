import React, { createContext, useContext, useState } from 'react';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [saldo, setSaldo] = useState(148.75);
  const [rendimentoSemanal, setRendimentoSemanal] = useState(24.50);
  const [streakDias, setStreakDias] = useState(7);
  const [pontos, setPontos] = useState(150);
  const [limiteDiario, setLimiteDiario] = useState(50.00);

  const [metas, setMetas] = useState([
    {
      id: '1',
      titulo: 'Comprar um videogame novo',
      valorAtual: 210.00,
      valorTotal: 350.00,
      porcentagem: 60,
      cor: '#004590',
      icone: 'gamepad'
    },
    {
      id: '2',
      titulo: 'Bicicleta nova',
      valorAtual: 90.00,
      valorTotal: 600.00,
      porcentagem: 15,
      cor: '#2b88c0',
      icone: 'bicycle'
    }
  ]);

  const [aprovacoesPendentes, setAprovacoesPendentes] = useState([
    { id: '1', descricao: 'Jogos', valor: 70.00, categoria: 'Jogos', icone: '🎮' },
    { id: '2', descricao: 'Comida', valor: 25.00, categoria: 'Comida', icone: '🍴' },
    { id: '3', descricao: 'Cinema', valor: 40.00, categoria: 'Cinema', icone: '🎬' }
  ]);

  // Função chamada pelo dependente para enviar pedido de despesa (RF03 / RF08)
  const solicitarDespesa = ({ descricao, valor, categoria }) => {
    const iconesPorCategoria = {
      'Jogos': '🎮',
      'Comida': '🍴',
      'Compras': '🛍️',
      'Transporte': '🚌',
      'Presente': '🎁',
      'Outros': '🏷️'
    };

    const novaAprovacao = {
      id: String(Date.now()),
      descricao: descricao || categoria || 'Nova Despesa',
      valor: parseFloat(valor),
      categoria: categoria || 'Outros',
      icone: iconesPorCategoria[categoria] || '🏷️'
    };

    setAprovacoesPendentes(prev => [novaAprovacao, ...prev]);
  };

  // Funções do responsável (Painel dos Pais - RF08)
  const aprovarDespesa = (id) => {
    const item = aprovacoesPendentes.find(i => i.id === id);
    if (item) {
      setSaldo(prev => Math.max(0, parseFloat((prev - item.valor).toFixed(2))));
    }
    setAprovacoesPendentes(prev => prev.filter(i => i.id !== id));
  };

  const negarDespesa = (id) => {
    setAprovacoesPendentes(prev => prev.filter(i => i.id !== id));
  };

  // Gamificação (Aprender & Recompensas)
  const adicionarPontos = (qtd = 50) => {
    setPontos(prev => prev + qtd);
  };

  return (
    <FinanceContext.Provider
      value={{
        saldo,
        rendimentoSemanal,
        streakDias,
        pontos,
        limiteDiario,
        setLimiteDiario,
        metas,
        aprovacoesPendentes,
        solicitarDespesa,
        aprovarDespesa,
        negarDespesa,
        adicionarPontos
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
