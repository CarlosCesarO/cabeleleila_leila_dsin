# Cabeleleila Leila

Projeto de agendamento pro salão: cadastro com nome, telefone, serviço e horário; dá pra buscar pelo telefone e editar em alguns casos.

**Backend:** Python, FastAPI, SQLite (arquivo `salao.db`), Pydantic pros dados de entrada.  
**Frontend:** React (CRA), chama a API com `fetch`. A URL da API tá no `frontend/src/api.js` (localhost:8000).

## Rodar

**API** — entra na pasta `backend`, instala as coisas e sobe o uvicorn:

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

Se quiser venv: `python -m venv .venv` e ativa antes do `pip`.

**Site** — outro terminal, pasta `frontend`:

```bash
cd frontend
npm install
npm start
```

Abre no navegador (geralmente porta 3000). O backend precisa estar rodando senão as requisições falham.

O `salao.db` aparece sozinho na primeira vez. Arquivo `.env` no backend é opcional (segredo / config local), não manda pro git.

Na tela de “meus agendamentos”, se o horário tá muito perto (tipo 2 dias), o sistema manda falar com a Leila em vez de editar pelo site.
