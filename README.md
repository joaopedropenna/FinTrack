# 📱 FinTrack — Aplicativo de Educação Financeira para Crianças e Jovens

> ⚠️ **AVISO INTERNO DA EQUIPE:**  
> Este README serve como **guia prático de desenvolvimento e alinhamento interno para nós do grupo**. Ele será alterado e revisado por nós posteriormente para a versão oficial pública de entrega final (menções honrosas à **Profa. Ma. Laila Alves Santos**).

---

## 👥 Integrantes da Equipe
- Gabriel de Almeida Rezende Nunes
- Guilherme de Oliveira Ferreira
- João Pedro Penna de Oliveira Silva
- João Vitor Dias de Almeida
- Thiago Alves do Nascimento
- Thúlio da Silva Alves

---

## 🎯 Sobre o Projeto
O **FinTrack** é uma solução digital criada para auxiliar crianças e adolescentes no desenvolvimento de hábitos financeiros saudáveis através de:
- Registro e controle de despesas diárias com limites pré-definidos.
- Estabelecimento e acompanhamento de metas de poupança interativas.
- Módulo educativo com conteúdos e gamificação por pontos.
- Dicas inteligentes com auxílio de Inteligência Artificial.
- Controle parental na versão Premium com aprovação e monitoramento de despesas em tempo real.

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia | Detalhes |
|---|---|---|
| **Frontend** | React Native (Expo SDK) | Interface responsiva mobile e web |
| **Backend** | Node.js + Express | API RESTful modular |
| **Banco de Dados** | MongoDB Atlas | Persistência NoSQL em nuvem |
| **Design/Prototipação** | Figma | Protótipo de alta fidelidade |
| **Versionamento** | Git & GitHub | Fluxo colaborativo por branches |

---

## 📂 Estrutura de Pastas

```
FinTrack/
├── frontend/                   # Interface Mobile e Web (React Native / Expo)
│   ├── src/
│   │   ├── components/         # Barra de navegação inferior (BottomNavBar)
│   │   ├── context/            # Estado global (FinanceContext - saldo, metas, aprovações)
│   │   └── screens/            # As 5 telas do Figma:
│   │       ├── HomeScreen.js           # Dashboard do Léo (Saldo, Metas, Dicas de IA, Vídeos)
│   │       ├── NovaDespesaScreen.js    # Teclado numérico na tela, categorias e limite
│   │       ├── ConfirmacaoScreen.js    # Pedido Enviado!
│   │       ├── AprenderScreen.js       # Pontuação (150 pts) e vídeos educativos
│   │       └── PainelPaisScreen.js     # Painel de aprovações do responsável (RF08)
│   ├── App.js
│   ├── app.json
│   └── package.json
│
├── backend/                    # Servidor REST (Node.js + Express + MongoDB)
│   ├── src/
│   │   ├── config/             # Conexão com MongoDB Atlas
│   │   ├── controllers/        # Controladores de regras de negócio
│   │   ├── models/             # Modelos Mongoose (Usuario, Conta, Transacao, Meta)
│   │   ├── routes/             # Rotas REST da aplicação
│   │   └── server.js           # Ponto de entrada da API
│   ├── package.json
│   └── .env.example
│
├── docs/                       # Documentação da entrega (PDFs, diagramas de classe e requisitos)
├── .gitignore
└── README.md
```

---

## 🖥️ ONDE E COMO EXECUTAR OS COMANDOS (Passo a Passo Detalhado)

### ❓ "Onde eu digito esses comandos?"
Você **NÃO precisa abrir nenhum programa externo**. Tudo é feito diretamente **dentro do próprio VS Code**:

1. Abra a pasta `FinTrack` no seu **VS Code**.
2. Olhe na barra de menus no topo da janela do VS Code e clique em:  
   👉 **Terminal** > **New Terminal** (Novo Terminal)  
   *(Atalho no teclado: `Ctrl + '`)*
3. Vai se abrir uma janelinha preta na **parte inferior da tela**. É exatamente nela que você digita os comandos abaixo.

---

### 1️⃣ Como Rodar o Aplicativo (Frontend)

Com a janela do terminal aberta no VS Code, digite um comando por vez e aperte **Enter**:

```bash
# 1. Entra na pasta do frontend:
cd frontend

# 2. Baixa as bibliotecas do aplicativo (só precisa fazer na primeira vez):
npm install

# 3. Inicia o aplicativo no seu navegador de internet:
npm run web
```

> **O que vai acontecer?**  
> O Expo vai inicializar e abrir automaticamente uma aba no seu Google Chrome/Edge com o celular funcionando e todas as telas navegáveis!  
> *(Dica: Se quiser testar no seu celular físico, instale o app **Expo Go** na Google Play ou App Store e leia o QR Code que vai aparecer no terminal usando `npm start`).*

---

### 2️⃣ Como Rodar o Servidor/API (Backend)

O frontend e o backend rodam ao mesmo tempo. Para rodar o backend sem fechar o frontend:

1. No canto superior direito da janelinha do terminal no VS Code, clique no ícone de **`+`** (Create New Terminal) para abrir uma **segunda aba de terminal**.
2. Nessa nova aba, digite:

```bash
# 1. Entra na pasta do backend:
cd backend

# 2. Instala as dependências da API:
npm install

# 3. Inicia o servidor em modo de desenvolvimento:
npm run dev
```

> O servidor iniciará em `http://localhost:3000`.  
> O teste de funcionamento estará ativo em `http://localhost:3000/api/health`.

---

## 🤝 Fluxo de Trabalho em Equipe no Git (Regras de Ouro)

Para ninguém apagar o código do outro e não gerar conflitos:

1. **Antes de começar qualquer tarefa, atualize seu código com o que o time fez:**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Crie uma branch própria para a sua tarefa (nunca programe direto na main):**
   ```bash
   git checkout -b feature/nome-da-sua-tarefa
   # Exemplo: git checkout -b feature/tela-cadastro
   ```

3. **Faça as alterações nos arquivos e salve. Depois registre suas mudanças:**
   ```bash
   git status
   git add .
   git commit -m "feat: descreva aqui de forma simples o que você fez"
   ```

4. **Envie sua branch para o GitHub:**
   ```bash
   git push -u origin feature/nome-da-sua-tarefa
   ```

5. **Abra o Pull Request:**  
   Vá no link [github.com/joaopedropenna/FinTrack](https://github.com/joaopedropenna/FinTrack), clique no botão verde **Compare & pull request** e avise o grupo para revisarem e aprovarem!
