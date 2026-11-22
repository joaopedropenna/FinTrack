# 📱 FinTrack — Aplicativo de Educação Financeira para Crianças e Jovens

Projeto desenvolvido para a disciplina de **Práticas Extensionistas Integradoras III**  
**Docente:** Profa. Ma. Laila Alves Santos

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
│   │   ├── components/         # Barra de navegação inferior e componentes reutilizáveis
│   │   ├── context/            # Gerenciamento de estado global (FinanceContext)
│   │   └── screens/            # Telas fiéis ao design do Figma:
│   │       ├── HomeScreen.js           # Dashboard principal do dependente (Léo)
│   │       ├── NovaDespesaScreen.js    # Teclado numérico customizado e categorias
│   │       ├── ConfirmacaoScreen.js    # Feedback de envio do pedido
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

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão LTS instalada)
- [Git](https://git-scm.com/)

---

### 1. Executando o Frontend (Aplicativo)

Abra o terminal na pasta `frontend`:
```bash
cd frontend
npm install
npm run web
```
> O Expo abrirá automaticamente o aplicativo no seu navegador. Você também pode rodar no celular instalando o aplicativo **Expo Go** e lendo o QR Code exibido no terminal (`npm start`).

---

### 2. Executando o Backend (API)

Abra outro terminal na pasta `backend`:
```bash
cd backend
npm install
npm run dev
```
> O servidor iniciará por padrão em `http://localhost:3000`. O endpoint de verificação estará ativo em `http://localhost:3000/api/health`.

---

## 🤝 Fluxo de Trabalho em Equipe no Git

Para manter o repositório organizado e sem conflitos:

1. **Atualizar a main:**
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Criar sua branch para a tarefa:**
   ```bash
   git checkout -b feature/nome-da-tarefa
   ```
3. **Salvar alterações:**
   ```bash
   git add .
   git commit -m "feat: descrição do que você desenvolveu"
   ```
4. **Enviar para o GitHub:**
   ```bash
   git push -u origin feature/nome-da-tarefa
   ```
5. **Abrir Pull Request (PR):**
   Vá no GitHub e abra um Pull Request para revisão da equipe.
