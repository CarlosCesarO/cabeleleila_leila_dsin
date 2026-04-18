import json
from datetime import datetime, timedelta

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from database import criar_tabelas, get_connection
from schemas import Agendamento

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

criar_tabelas()


@app.post("/agendamentos")
def criar_agendamento(dados: Agendamento):
    conn = get_connection()
    conn.execute(
        "INSERT INTO agendamentos (cliente_nome, cliente_telefone, servicos, data_hora) VALUES (?, ?, ?, ?)",
        (dados.cliente_nome.strip(), dados.cliente_telefone.strip(), json.dumps(dados.servicos), dados.data_hora),
    )
    conn.commit()
    conn.close()
    return {"criado": True, "mensagem": "Agendamento criado com sucesso"}


@app.get("/meus-agendamentos")
def meus_agendamentos(telefone: str = Query(...)):
    conn = get_connection()
    rows = conn.execute(
        "SELECT id, cliente_nome, cliente_telefone, servicos, data_hora FROM agendamentos WHERE trim(cliente_telefone) = trim(?) ORDER BY data_hora DESC",
        (telefone.strip(),),
    ).fetchall()
    conn.close()
    return [{**dict(r), "servicos": json.loads(r["servicos"] or "[]")} for r in rows]


@app.put("/agendamentos/{agendamento_id}")
def atualizar_agendamento(agendamento_id: int, dados: Agendamento):
    conn = get_connection()
    row = conn.execute("SELECT id FROM agendamentos WHERE id = ?", (agendamento_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Não encontrado.")
    conn.execute(
        "UPDATE agendamentos SET cliente_nome = ?, servicos = ?, data_hora = ? WHERE id = ?",
        (dados.cliente_nome.strip(), json.dumps(dados.servicos), dados.data_hora, agendamento_id),
    )
    conn.commit()
    conn.close()
    return {"ok": True, "mensagem": "Atualizado."}