# 📱 FinTrack — Aplicativo de Educação Financeira para Crianças e Jovens

> ⚠️ **AVISO INTERNO DA EQUIPE:**  
> Este README serve como **guia prático de desenvolvimento e alinhamento interno para o nosso grupo**. Ele será alterado e revisado por nós posteriormente para a versão oficial pública de entrega final (com as devidas menções honrosas e agradecimentos à **Profa. Ma. Laila Alves Santos**).

---

## 👥 Integrantes da Equipe
- Gabriel de Almeida Rezende Nunes
- Guilherme de Oliveira Ferreira
- João Pedro Penna de Oliveira Silva ✅
- João Vitor Dias de Almeida
- Thiago Alves do Nascimento ✅
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
├── package.json                # Atalhos de execução na raiz (Frontend + Backend)
├── frontend/                   # Interface Mobile e Web (React Native / Expo)
│   ├── src/
│   │   ├── components/         # Barra de navegação inferior (BottomNavBar)
│   │   ├── context/            # Estado global (FinanceContext - saldo, metas, aprovações)
│   │   └── screens/            # As telas do aplicativo:
│   │       ├── HomeScreen.js           # Dashboard do Léo (Saldo, Metas, Dicas de IA, Vídeos)
│   │       ├── MetasScreen.js          # Minhas Metas detalhadas e dicas de economia
│   │       ├── NovaDespesaScreen.js    # Teclado numérico em tela, categorias e limite
│   │       ├── ConfirmacaoScreen.js    # Pedido Enviado!
│   │       ├── AprenderScreen.js       # Pontuação (150 pts) e vídeos educativos
│   │       ├── PerfilScreen.js         # Perfil do dependente e alternância de papel
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

## 🖥️ ONDE E COMO EXECUTAR OS COMANDOS (Passo a Passo)

### Onde digitar os comandos:
Tudo deve ser executado diretamente **dentro do próprio VS Code**:

1. Abra a pasta `FinTrack` no **VS Code**.
2. No menu superior do VS Code, clique em:  
   👉 **Terminal** > **New Terminal** (ou atalho `Ctrl + '`).
3. Uma janela preta abrirá na **parte inferior da tela**.

---

### Método Rápido (Executando diretamente da raiz `FinTrack>`)

Com o terminal aberto na pasta raiz do projeto (`C:\Dev\FinTrack>`):

#### 1. Instalar todas as dependências de uma vez só:
```bash
npm run install:all
```
*(Esse comando instala as dependências do Frontend e do Backend ao mesmo tempo).*

#### 2. Iniciar o Aplicativo (Frontend):
```bash
npm run web
```
*(O Expo iniciará e abrirá automaticamente o aplicativo no seu navegador).*

#### 3. Iniciar o Servidor (Backend):
Para rodar o backend junto com o frontend:
1. Clique no botão de **`+`** no canto superior direito da janela do terminal no VS Code para abrir um segundo terminal.
2. No segundo terminal, execute:
```bash
npm run backend
```
*(O servidor iniciará em `http://localhost:3000`).*

---

### Método Manual (Entrando nas subpastas)

Caso prefira entrar individualmente em cada pasta:

- **Frontend:**
  ```bash
  cd frontend
  npm install
  npm run web
  ```
- **Backend:**
  ```bash
  cd backend
  npm install
  npm run dev
  ```

---

## 🤝 Fluxo de Trabalho em Equipe no Git (Regras)

Para evitar sobrescrita de código e conflitos entre os membros:

1. **Atualizar o repositório local com as últimas alterações:**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Criar uma branch individual para cada tarefa (nunca programar direto na main):**
   ```bash
   git checkout -b feature/nome-da-tarefa
   ```

3. **Verificar o que foi alterado e salvar o commit:**
   ```bash
   git status
   git add .
   git commit -m "tipo: descricao clara do que foi desenvolvido"
   ```

4. **Enviar a branch para o GitHub:**
   ```bash
   git push -u origin feature/nome-da-tarefa
   ```

5. **Abrir Pull Request (PR):**  
   Acesse [github.com/joaopedropenna/FinTrack](https://github.com/joaopedropenna/FinTrack), clique no botão **Compare & pull request** e comunique a equipe para revisão.

---

### 💡 Nota da Equipe: Lista de "Colaboradores" na Barra Lateral do GitHub
Na página inicial do repositório, na barra lateral direita, existe uma seção chamada **Colaboradores** (*Contributors* em inglês):
- Essa seção contabiliza apenas **autores que já enviaram commits de código**.
- Portanto, mesmo que você já tenha aceitado o convite de colaborador, o seu nome e foto só aparecerão nessa lista lateral **após o seu primeiro `git push`** ser enviado (o contador mudará para *Colaboradores 2*, *Colaboradores 3* sucessivamente conforme cada integrante do grupo comitar).
- Desde que o seu convite tenha sido aceito em *Settings > Collaborators*, o seu acesso de envio e trabalho em equipe já está liberado!
