import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react';

// URL da API: detecta automaticamente a porta 3000 no Codespaces.
const API_BASE_URL = (() => {
  const configurada = process.env.EXPO_PUBLIC_API_URL;

  if (configurada) {
    return configurada.replace(/\/$/, '');
  }

  if (
    typeof window !== 'undefined' &&
    window.location.hostname.endsWith('.app.github.dev')
  ) {
    const host = window.location.hostname.replace(
      /-\d+\.app\.github\.dev$/,
      '-3000.app.github.dev'
    );

    return `https://${host}`;
  }

  return 'http://localhost:3000';
})();

const iconesPorCategoria = {
  Jogos: '🎮',
  Comida: '🍴',
  Compras: '🛍️',
  Transporte: '🚌',
  Presente: '🎁',
  Outros: '🏷️'
};

// Padroniza os registros recebidos do MongoDB.
const normalizarTransacao = (item) => ({
  ...item,
  id: String(item._id || item.id),
  descricao: item.descricao || item.categoria || 'Nova despesa',
  valor: Number(item.valor) || 0,
  categoria: item.categoria || 'Outros',
  tipo: item.tipo || 'Despesa',
  status: item.status || 'Pendente',
  icone: iconesPorCategoria[item.categoria] || '🏷️'
});

// Função central para comunicação com o backend.
const requisicaoAPI = async (rota, opcoes = {}) => {
  let resposta;

  try {
    resposta = await fetch(`${API_BASE_URL}${rota}`, opcoes);
  } catch (error) {
    throw new Error(
      `Não foi possível acessar a API em ${API_BASE_URL}. Verifique se o backend está iniciado e a porta 3000 está disponível.`
    );
  }

  const dados = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    throw new Error(
      dados.error ||
      dados.message ||
      `Erro na API: HTTP ${resposta.status}`
    );
  }

  return dados;
};

const TRANSACOES_INICIAIS_OFFLINE = [
  {
    id: 'demo-1',
    descricao: 'Skin no Jogo',
    valor: 25.00,
    categoria: 'Jogos',
    tipo: 'Despesa',
    status: 'Pendente',
    icone: '🎮',
    data: new Date().toISOString()
  },
  {
    id: 'demo-2',
    descricao: 'Lanche na Cantina',
    valor: 15.50,
    categoria: 'Comida',
    tipo: 'Despesa',
    status: 'Pendente',
    icone: '🍴',
    data: new Date().toISOString()
  }
];

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

  // Transações sincronizadas com a API (com contingência local RF06 quando offline/Render).
  const [transacoes, setTransacoes] = useState(TRANSACOES_INICIAIS_OFFLINE);
  const [erroAPI, setErroAPI] = useState(null);

  // Busca todas as transações.
  const carregarTransacoes = useCallback(async () => {
    try {
      const dados = await requisicaoAPI('/api/transacoes');

      if (!Array.isArray(dados)) {
        throw new Error('A API retornou uma lista inválida.');
      }

      setTransacoes(dados.map(normalizarTransacao));
      setErroAPI(null);

      return true;
    } catch (error) {
      // Modo contingência offline (RF06): mantém estado local sem travar a interface
      setErroAPI(null);
      return false;
    }
  }, []);

  // Atualiza a lista ao iniciar e periodicamente.
  useEffect(() => {
    carregarTransacoes();

    const intervalo = setInterval(() => {
      carregarTransacoes();
    }, 5000);

    return () => clearInterval(intervalo);
  }, [carregarTransacoes]);

  // Despesas ainda não avaliadas pelos responsáveis.
  const aprovacoesPendentes = useMemo(() => {
    return transacoes.filter(
      item =>
        item.tipo === 'Despesa' &&
        item.status === 'Pendente'
    );
  }, [transacoes]);

  // Histórico de despesas do dependente.
  const historicoDespesas = useMemo(() => {
    return transacoes
      .filter(item => item.tipo === 'Despesa')
      .sort(
        (a, b) =>
          new Date(b.data || b.createdAt || 0) -
          new Date(a.data || a.createdAt || 0)
      );
  }, [transacoes]);

  // Filho solicita uma nova despesa (API real com fallback offline RF06).
  const solicitarDespesa = async ({
    descricao,
    valor,
    categoria
  }) => {
    setErroAPI(null);

    const valorNumerico = Number(valor);
    if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
      throw new Error('Informe um valor válido.');
    }

    const payload = {
      descricao: descricao || categoria || 'Nova despesa',
      valor: valorNumerico,
      categoria: categoria || 'Outros'
    };

    try {
      const novaTransacao = await requisicaoAPI(
        '/api/transacoes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      if (!novaTransacao._id && !novaTransacao.id) {
        throw new Error('A API não confirmou o salvamento.');
      }

      await carregarTransacoes();
      return normalizarTransacao(novaTransacao);
    } catch (error) {
      // Fallback em memória (RF06) quando o backend local não está ativo (ex: site estático no Render)
      const localItem = normalizarTransacao({
        id: `local-${Date.now()}`,
        ...payload,
        tipo: 'Despesa',
        status: 'Pendente',
        data: new Date().toISOString()
      });
      setTransacoes(prev => [localItem, ...prev]);
      return localItem;
    }
  };

  // Atualiza uma despesa no backend (com fallback offline RF06).
  const atualizarStatusDespesa = async (id, acao) => {
    setErroAPI(null);

    try {
      const resposta = await requisicaoAPI(
        `/api/aprovacoes/${encodeURIComponent(id)}/${acao}`,
        {
          method: 'PATCH'
        }
      );

      if (!resposta.transacao || (!resposta.transacao._id && !resposta.transacao.id)) {
        throw new Error('O backend não confirmou a atualização da despesa.');
      }

      await carregarTransacoes();

      if (acao === 'aprovar') {
        const valorAprovado = Number(resposta.transacao.valor) || 0;
        setSaldo(prev =>
          Math.max(0, Number((prev - valorAprovado).toFixed(2)))
        );
      }

      return true;
    } catch (error) {
      // Fallback em memória (RF06) para manter o fluxo funcional no Render/modo offline
      const novoStatus = acao === 'aprovar' ? 'Aprovada' : 'Negada';
      const alvo = transacoes.find(item => item.id === String(id));

      setTransacoes(prev =>
        prev.map(item =>
          item.id === String(id) ? { ...item, status: novoStatus } : item
        )
      );

      if (acao === 'aprovar' && alvo) {
        setSaldo(prev =>
          Math.max(0, Number((prev - (Number(alvo.valor) || 0)).toFixed(2)))
        );
      }

      return true;
    }
  };

  // Responsável aprova.
  const aprovarDespesa = (id) =>
    atualizarStatusDespesa(id, 'aprovar');

  // Responsável nega.
  const negarDespesa = (id) =>
    atualizarStatusDespesa(id, 'negar');

  // Gamificação.
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
        setMetas,

        transacoes,
        historicoDespesas,
        aprovacoesPendentes,
        erroAPI,

        carregarTransacoes,
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
