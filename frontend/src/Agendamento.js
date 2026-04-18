import { useState } from "react";
import { API_BASE } from "./api";

const SERVICOS = ["Corte", "Barba"];

function Agendamento() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servicos, setServicos] = useState([]);
  const [dataHora, setDataHora] = useState("");
  const [mensagem, setMensagem] = useState({ texto: "", erro: false });

  function toggleServico(s) {
    setServicos((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (servicos.length === 0) {
      setMensagem({ texto: "Selecione ao menos um serviço.", erro: true });
      return;
    }

    fetch(`${API_BASE}/agendamentos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cliente_nome: nome,
        cliente_telefone: telefone,
        servicos,
        data_hora: dataHora,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setMensagem({
            texto: data.detail ?? "Erro ao criar agendamento",
            erro: true,
          });
          return;
        }
        setMensagem({
          texto: data.mensagem ?? "Agendamento criado com sucesso",
          erro: false,
        });
      })
      .catch(() =>
        setMensagem({ texto: "Erro ao criar agendamento", erro: true }),
      );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Agendamento</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <br />
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Telefone:</label>
          <br />
          <input
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
            pattern="^\d{10,11}$"
            title="Deve conter 10 ou 11 dígitos"
          />
        </div>
        <br />
        <div>
          <span>Serviços:</span>
          <div style={{ marginTop: "8px" }}>
            {SERVICOS.map((s) => (
              <label
                key={s}
                style={{
                  display: "block",
                  marginBottom: "6px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={servicos.includes(s)}
                  onChange={() => toggleServico(s)}
                />{" "}
                {s}
              </label>
            ))}
          </div>
        </div>
        <br />
        <div>
          <label>Data e Hora:</label>
          <br />
          <input
            type="datetime-local"
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Agendar</button>
      </form>

      {mensagem.texto && (
        <p
          style={{
            color: mensagem.erro ? "#b71c1c" : "inherit",
            marginTop: "12px",
          }}
        >
          {mensagem.texto}
        </p>
      )}
    </div>
  );
}

export default Agendamento;
