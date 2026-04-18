# Cabeleleila Leila

Sistema simples de agendamento para salão: o cliente cadastra nome, telefone, serviços e data/hora; pode consultar os agendamentos pelo telefone e editar quando permitido pela regra de prazo.

## Tecnologias

| Parte        | Tecnologias                                                                                                                                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend**  | Python 3, **FastAPI**, **Uvicorn**, **Pydantic** (modelo `Agendamento` em `schemas.py`), **SQLite** (`sqlite3`), **python-dotenv** (carrega `.env` no `database.py`) |
| **Frontend** | **React** (Create React App), JavaScript, `fetch` para a API                                                                                                         |

A URL da API no desenvolvimento está em `frontend/src/api.js` (padrão: `http://localhost:8000`).

## Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (npm incluso)
- [Python](https://www.python.org/) 3.10 ou superior (recomendado)

### Backend

No terminal, a partir da pasta `backend`:

1. Crie e ative um ambiente virtual (opcional, mas recomendado):

   ```bash
   cd backend
   python -m venv .venv
   ```

   **Windows (PowerShell):** `.\.venv\Scripts\Activate.ps1`  
   **Linux/macOS:** `source .venv/bin/activate`

2. Instale as dependências:

   ```bash
   pip install -r requirements.txt
   ```

3. (Opcional) Crie o arquivo `.env` na pasta `backend` se quiser configurar variáveis (por exemplo caminho do SQLite; o arquivo não deve ser commitado — está no `.gitignore`).

4. Suba o servidor:

   ```bash
   python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

A API fica em `http://localhost:8000`. Documentação interativa: `http://localhost:8000/docs`.

O banco é um arquivo **SQLite** (`salao.db`), criado automaticamente na primeira execução, na pasta em que o processo do backend é iniciado (em geral `backend/`).

### Frontend

Em outro terminal, na pasta `frontend`:

```bash
cd frontend
npm install
npm start
```

O navegador abre em `http://localhost:3000`. O front espera o backend na porta **8000**; se mudar a porta, ajuste `frontend/src/api.js`.
