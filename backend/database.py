import os
import sqlite3

from dotenv import load_dotenv

load_dotenv()


def _sqlite_path() -> str:
    path = os.getenv("SQLITE_PATH")
    return path


def get_connection():
    conn = sqlite3.connect(_sqlite_path())
    conn.row_factory = sqlite3.Row
    return conn


def criar_tabelas():
    conn = get_connection()
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS agendamentos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cliente_nome TEXT NOT NULL,
            cliente_telefone TEXT NOT NULL,
            servicos TEXT NOT NULL,
            data_hora TEXT NOT NULL
        )
        """
    )
    conn.commit()
    conn.close()
