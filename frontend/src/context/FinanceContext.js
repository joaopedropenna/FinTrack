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

  // Transações recebidas diretamente da API.
  const [transacoes, setTransacoes] = useState([]);
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
      console.error('Erro ao carregar transações:', error);
      setErroAPI(error.message);

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

  // Filho solicita uma nova despesa.
  const solicitarDespesa = async ({
    descricao,
    valor,
    categoria
  }) => {
    setErroAPI(null);

    try {
      const valorNumerico = Number(valor);

      if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
        throw new Error('Informe um valor válido.');
      }

      const novaTransacao = await requisicaoAPI(
        '/api/transacoes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            descricao: descricao || categoria || 'Nova despesa',
            valor: valorNumerico,
            categoria: categoria || 'Outros'
          })
        }
      );

      // Exige confirmação de um registro salvo no MongoDB.
      if (!novaTransacao._id) {
        throw new Error(
          'A API não confirmou o salvamento no MongoDB. Verifique a conexão com o banco.'
        );
      }

      await carregarTransacoes();

      return normalizarTransacao(novaTransacao);

    } catch (error) {
      setErroAPI(error.message);
      throw error;
    }
  };

  // Atualiza uma despesa no backend.
  const atualizarStatusDespesa = async (id, acao) => {
    setErroAPI(null);

    try {
      const resposta = await requisicaoAPI(
        `/api/aprovacoes/${encodeURIComponent(id)}/${acao}`,
        {
          method: 'PATCH'
        }
      );

      // Só considera sucesso quando o backend retorna o registro atualizado.
      if (!resposta.transacao || !resposta.transacao._id) {
        throw new Error(
          'O backend não confirmou a atualização da despesa no banco de dados.'
        );
      }

      // Atualiza os dados compartilhados pelos dois perfis.
      await carregarTransacoes();

      if (acao === 'aprovar') {
        const valorAprovado = Number(resposta.transacao.valor) || 0;

        setSaldo(prev =>
          Math.max(0, Number((prev - valorAprovado).toFixed(2)))
        );
      }

      return true;

    } catch (error) {
      console.error('Erro ao atualizar despesa:', error);
      setErroAPI(error.message);

      return false;
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
