import { useState } from "react";
import { API_BASE } from "./api";

const SENHA_ADMIN = "leila123";

function Admin() {
  const [senha, setSenha] = useState("");
  const [autenticado, setAutenticado] = useState(false);
  const [lista, setLista] = useState([]);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [mensagem, setMensagem] = useState("");

  function entrar(e) {
    e.preventDefault();
    if (senha !== SENHA_ADMIN) {
      setMensagem("Senha incorreta.");
      return;
    }
    setAutenticado(true);
    buscar();
  }

  function buscar() {
    const params = new URLSearchParams();
    if (dataInicio) params.append("inicio", dataInicio);
    if (dataFim) params.append("fim", dataFim);
    fetch(`${API_BASE}/admin/agendamentos?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setLista(data);
        if (data.length === 0) setMensagem("Nenhum agendamento encontrado.");
        else setMensagem("");
      })
      .catch(() => setMensagem("Erro ao buscar."));
  }

  if (!autenticado) {
    return (
      <div style={{ padding: "40px", maxWidth: "400px", margin: "0 auto" }}>
        <h2>Área administrativa</h2>
        <form onSubmit={entrar}>
          <label>Senha:</label>
          <br />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Entrar</button>
        </form>
        {mensagem && (
          <p style={{ color: "#b71c1c", marginTop: "16px" }}>{mensagem}</p>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Todos os agendamentos</h2>

      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "flex-end",
          marginBottom: "24px",
        }}
      >
        <div>
          <label>Data início:</label>
          <br />
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </div>
        <div>
          <label>Data fim:</label>
          <br />
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>
        <button type="button" onClick={buscar}>
          Filtrar
        </button>
      </div>

      {mensagem && <p style={{ marginTop: "16px" }}>{mensagem}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {lista.map((a) => (
          <li
            key={a.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "14px",
              marginBottom: "12px",
            }}
          >
            <div>
              <strong>{a.cliente_nome}</strong> — {a.cliente_telefone}
            </div>
            <div>
              <strong>Serviços:</strong> {a.servicos.join(", ")}
            </div>
            <div>
              <strong>Data e hora:</strong> {a.data_hora}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
