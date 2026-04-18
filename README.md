# Cabeleleila Leila

Projeto de agendamento pro salão: cadastro com nome, telefone, serviço e horário; dá pra buscar pelo telefone e editar em alguns casos.

**Backend:** Python, FastAPI, SQLite.  
**Frontend:** React, chama a API com `fetch`. A URL da API tá no `frontend/src/api.js` (localhost:8000).

## Rodar

**API** — entra na pasta `backend`, instala as coisas e sobe o uvicorn:

```bash
cd backend
venv: `python -m venv .venv`
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

**Site** — outro terminal, pasta `frontend`:

```bash
cd frontend
npm install
npm start
```

- Abre no navegador (geralmente porta 3000). O backend precisa estar rodando senão as requisições falham.
- O `salao.db` aparece sozinho na primeira vez. 
- Na tela de “meus agendamentos”, se o horário tá muito perto (tipo 2 dias), o sistema manda falar com a Leila em vez de editar pelo site.
