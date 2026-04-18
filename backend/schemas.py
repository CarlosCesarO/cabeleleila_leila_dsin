from pydantic import BaseModel


class Agendamento(BaseModel):
    cliente_nome: str
    cliente_telefone: str
    servicos: list[str]
    data_hora: str
