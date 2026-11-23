# 📱 FinTrack — Aplicativo de Educação Financeira para Crianças e Jovens

Projeto prático desenvolvido para a disciplina **Práticas Extensionistas Integradoras III**, sob orientação da **Profa. Ma. Laila Alves Santos**.

---

## 🎯 Sobre o Projeto

O **FinTrack** é uma solução digital criada para apoiar crianças e jovens no desenvolvimento de hábitos financeiros saudáveis e responsáveis. A plataforma reúne ferramentas de registro e controle de gastos diários, definição de metas de poupança, conteúdos educativos interativos e supervisão parental com aprovação de despesas em tempo real.

---

## 🚀 Funcionalidades e Telas do Aplicativo

O FinTrack possui duas experiências integradas e focadas nas necessidades de cada usuário:

### 👦 Experiência do Dependente (Criança / Jovem)
* **Início (Dashboard):** Visualização do saldo atual, indicador de dias seguidos de uso (ofensiva com foguinho 🔥), resumo das metas de poupança ativas e card com dicas inteligentes geradas por IA.
* **Minhas Metas:** Criação e acompanhamento de objetivos financeiros (ex: videogame, bicicleta), com barras de progresso percentual e dicas para poupar mais rápido.
* **Nova Despesa:** Registro de gastos com teclado numérico próprio em tela, seleção de categoria (Lanches, Jogos, Transporte) e aviso do limite diário disponível.
* **Confirmação de Solicitação:** Notificação visual de sucesso quando uma despesa é enviada para avaliação dos pais.
* **Aprender (Gamificação):** Módulo com vídeos educativos sobre finanças que geram pontos para resgate de recompensas combinadas com os pais (como vales para jogos na Steam/Roblox, passeios em família ou bônus na mesada).
* **Perfil:** Dados do jovem, estatísticas de ofensiva e pontos, e configurações da conta.

### 🛡️ Experiência do Responsável (Controle Parental - RF08)
* **Painel dos Pais:** Tela com visual e acesso isolados para gestão familiar.
* **Fila de Aprovação em Tempo Real:** Listagem de todas as compras solicitadas pelo dependente com opção de **Aprovar** (debitando o saldo) ou **Negar** o pedido.
* **Gestão de Limites:** Definição e alteração do limite diário de gastos do dependente.

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia | Finalidade no Projeto |
|---|---|---|
| **Frontend** | React Native (Expo SDK) | Interface multiplataforma (Mobile e Web no navegador) com componentes táteis |
| **Backend** | Node.js + Express | API RESTful para regras de negócio e controle de aprovações |
| **Banco de Dados** | MongoDB Atlas | Persistência NoSQL em nuvem (com contingência em memória para testes offline) |
| **Design / UX** | Figma | Protótipo interativo de alta fidelidade |

> 📘 **Documentação Técnica Completa:**  
> A especificação detalhada da arquitetura, diagrama de classes UML, rastreabilidade de requisitos (RF/RNF) e o catálogo de endpoints da API estão disponíveis no arquivo:  
> 👉 [Manual Técnico Parcial (docs/manual-tecnico-parcial.md)](docs/manual-tecnico-parcial.md)

---

## 💻 Como Executar o Projeto

### Pré-requisitos:
* Ter o **Node.js** instalado (versão 18 ou superior).

### 1. Instalar as dependências:
Abra o terminal na pasta raiz do projeto (`FinTrack`) e execute:
```bash
npm run install:all
```
*(Esse comando instala automaticamente as dependências do Frontend e do Backend ao mesmo tempo).*

### 2. Iniciar o Aplicativo:
```bash
npm run web
```
*O FinTrack abrirá automaticamente no seu navegador padrão.*

> 💡 **Dica de Avaliação:**  
> No topo da interface web há o seletor de papel (**👦 App do Filho** vs **🛡️ App dos Pais**). Ele permite simular tanto a solicitação de uma despesa pelo jovem quanto a aprovação ou negação imediata pelos pais na mesma sessão.

> 📌 **Ambiente Recomendado para Avaliação (Execução Web):**  
> A forma oficial e recomendada para testar e avaliar a aplicação é pelo navegador com o comando **`npm run web`**.  
> 
> **Sobre a execução em celulares físicos (Expo Go no Android e iPhone):**  
> O projeto foi desenvolvido na versão estável do **Expo SDK 52**. Nos celulares (seja Android pela Google Play ou iPhone pela App Store), o aplicativo *Expo Go* é atualizado automaticamente para as versões mais novas (como o SDK 58). Essa diferença de versões entre o código do projeto e o aplicativo instalado no celular gera um erro de incompatibilidade ao escanear o QR Code (que será solucionado nas próximas etapas de manutenção do projeto).  
> 
> Por isso, a execução via **Web (`npm run web`)** é a ideal para a correção: ela já funciona direto no computador, não depende de versões do celular e reproduz fielmente a tela de smartphone, com botões, componentes visuais e o seletor de papéis.

---

## 👥 Integrantes da Equipe

Projeto desenvolvido de forma colaborativa pelos acadêmicos:
* **Gabriel de Almeida Rezende Nunes**
* **Guilherme de Oliveira Ferreira**
* **João Pedro Penna de Oliveira Silva**
* **João Vitor Dias de Almeida**
* **Thiago Alves do Nascimento**
* **Thúlio da Silva Alves**
