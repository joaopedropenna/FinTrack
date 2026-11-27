# Roteiro prático de testes da API REST

## Preparação

Na raiz do projeto, inicie a API:

```bash
npm run backend
```

O servidor usa a porta `3000` por padrão (ou a porta definida em `PORT`). Em outro terminal, defina a URL base:

```bash
BASE=http://localhost:3000
```

No Windows PowerShell, use `$BASE = "http://localhost:3000"` e substitua `$BASE` nos exemplos. A coleção [api-requests.http](api-requests.http) pode ser executada com a extensão REST Client do VS Code. Para os testes de aprovação, use IDs reais de despesas pendentes retornados pelo endpoint de listagem; a rota de aprovação consulta o MongoDB.

## 1. Verificar a API — `GET /api/health`

```bash
curl -i "$BASE/api/health"
```

Esperado: `200 OK` e um JSON com estado online, nome, versão e timestamp atual. O timestamp varia a cada chamada.

```json
{
  "status": "online",
  "app": "FinTrack API",
  "version": "1.0.0",
  "timestamp": "<data e hora da chamada>"
}
```

## 2. Listar transações — `GET /api/transacoes`

```bash
curl -i "$BASE/api/transacoes"
```

Esperado: `200 OK` e um array. Se não houver transações no banco ou a consulta falhar, o controller devolve dados simulados; um item segue este formato:

```json
[
  {
    "id": "1",
    "descricao": "Jogos",
    "valor": 70,
    "categoria": "Jogos",
    "tipo": "Despesa",
    "status": "Pendente",
    "data": "<data e hora>"
  }
]
```

## 3. Criar transação — `POST /api/transacoes`

```bash
curl -i -X POST "$BASE/api/transacoes" \
  -H 'Content-Type: application/json' \
  -d '{"descricao":"Material escolar","valor":89.90,"categoria":"Educação"}'
```

Esperado: `201 Created`; a resposta contém a transação criada como despesa pendente. IDs e campos automáticos dependem do armazenamento usado.

```json
{
  "descricao": "Material escolar",
  "valor": 89.9,
  "categoria": "Educação",
  "tipo": "Despesa",
  "status": "Pendente"
}
```

Valor menor ou igual a zero é rejeitado com `400 Bad Request`:

```bash
curl -i -X POST "$BASE/api/transacoes" \
  -H 'Content-Type: application/json' \
  -d '{"descricao":"Compra","valor":-10}'
```

Descrição vazia ou composta apenas por espaços também retorna `400`:

```bash
curl -i -X POST "$BASE/api/transacoes" \
  -H 'Content-Type: application/json' \
  -d '{"descricao":"   ","valor":10}'
```

Corpo esperado para ambos os erros:

```json
{"error":"Valor inválido."}
```

## 4. Listar metas — `GET /api/metas`

```bash
curl -i "$BASE/api/metas"
```

Esperado: `200 OK` e um array. Quando o banco não retorna metas ou ocorre falha na consulta, o controller responde com os dados simulados:

```json
[
  {
    "id": "1",
    "titulo": "Comprar um videogame novo",
    "valorAtual": 210,
    "valorTotal": 350,
    "porcentagem": 60,
    "icone": "🎮",
    "cor": "#004590"
  }
]
```

## 5. Criar meta — `POST /api/metas`

```bash
curl -i -X POST "$BASE/api/metas" \
  -H 'Content-Type: application/json' \
  -d '{"titulo":"Notebook","valorTotal":2500,"valorAtual":300,"icone":"💻","cor":"#004590"}'
```

Esperado: `201 Created` e o documento salvo (incluindo os campos automáticos definidos pelo modelo/banco). `valorTotal` e `valorAtual` são convertidos para número; se `valorAtual`, `icone` ou `cor` forem omitidos, o controller usa `0`, `🎯` e `#004590`. Se salvar falhar, retorna `500` com `{"error":"Erro ao criar meta"}`. O controller não declara validação de entrada específica para metas.

## 6. Listar despesas pendentes — `GET /api/aprovacoes/pendentes`

```bash
curl -i "$BASE/api/aprovacoes/pendentes"
```

Esperado: `200 OK` e um array de transações com `tipo: "Despesa"` e `status: "Pendente"`. Copie o `_id` de duas despesas para os próximos exemplos. Se não houver duas despesas pendentes, crie transações e consulte novamente; a aprovação procura os registros no MongoDB.

## 7. Aprovar uma despesa — `PATCH /api/aprovacoes/:id/aprovar`

Substitua `<ID_PENDENTE>` por um `_id` retornado no passo anterior:

```bash
curl -i -X PATCH "$BASE/api/aprovacoes/<ID_PENDENTE>/aprovar"
```

Esperado: `200 OK`, mensagem de sucesso e a transação atualizada com `status: "Aprovada"`:

```json
{
  "message": "Despesa aprovada com sucesso!",
  "transacao": {
    "_id": "<ID>",
    "tipo": "Despesa",
    "status": "Aprovada"
  }
}
```

## 8. Negar outra despesa — `PATCH /api/aprovacoes/:id/negar`

Use o ID de uma segunda despesa ainda pendente:

```bash
curl -i -X PATCH "$BASE/api/aprovacoes/<OUTRO_ID_PENDENTE>/negar"
```

Esperado: `200 OK`, mensagem `Despesa negada com sucesso!` e a transação retornada com `status: "Negada"`.

## 9. Erros das rotas de aprovação

ID em formato inválido retorna `400 Bad Request`:

```bash
curl -i -X PATCH "$BASE/api/aprovacoes/id-invalido/aprovar"
```

```json
{"error":"ID da despesa inválido."}
```

ID válido sem despesa correspondente retorna `404 Not Found`:

```bash
curl -i -X PATCH "$BASE/api/aprovacoes/000000000000000000000000/aprovar"
```

```json
{"error":"Despesa não encontrada."}
```

Uma despesa já processada retorna `409 Conflict` com `{"error":"Esta despesa já foi processada."}`. Um registro encontrado que não seja do tipo `Despesa` retorna `400` com `{"error":"Apenas despesas podem ser aprovadas ou negadas."}`.
