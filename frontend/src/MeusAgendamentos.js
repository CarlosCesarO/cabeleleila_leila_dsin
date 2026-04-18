import { useState } from "react";
import { API_BASE } from "./api";

const SERVICOS = ["Corte", "Barba"];

function podeEditar(dataHora) {
  const dt = new Date(dataHora.replace(" ", "T"));
  const doisDias = new Date();
  doisDias.setDate(doisDias.getDate() + 2);
  return dt > doisDias;
}

function MeusAgendamentos() {
  const [telefone, setTelefone] = useState("");
  const [lista, setLista] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [editando, setEditando] = useState(null);
  const [formNome, setFormNome] = useState("");
  const [formServicos, setFormServicos] = useState([]);
  const [formData, setFormData] = useState("");

  const telDigitos = () => telefone.replace(/\D/g, "");

  function buscar(e) {
    e.preventDefault();
    const t = telDigitos();
    if (t.length < 10 || t.length > 11) {
      setMensagem("Informe um telefone com 10 ou 11 dígitos.");
      return;
    }
    fetch(`${API_BASE}/meus-agendamentos?telefone=${t}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setMensagem("Nenhum agendamento encontrado.");
          return;
        }
        setLista(data);
      })
      .catch(() => setMensagem("Erro ao buscar."));
  }

  function iniciarEdicao(a) {
    setEditando(a.id);
    setFormNome(a.cliente_nome);
    setFormServicos([...a.servicos]);
    setFormData(a.data_hora.slice(0, 16).replace(" ", "T"));
  }

  function toggleServico(s) {
    setFormServicos((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  }

  function salvar() {
    fetch(`${API_BASE}/agendamentos/${editando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cliente_telefone: telDigitos(),
        cliente_nome: formNome,
        servicos: formServicos,
        data_hora: formData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMensagem(data.mensagem ?? "Salvo.");
        setLista((prev) =>
          prev.map((x) =>
            x.id === editando
              ? {
                  ...x,
                  cliente_nome: formNome,
                  servicos: [...formServicos],
                  data_hora: formData,
                }
              : x,
          ),
        );
        setEditando(null);
      })
      .catch(() => setMensagem("Erro ao salvar."));
  }

  return (
    <div style={{ padding: "40px", maxWidth: "520px", margin: "0 auto" }}>
      <h2>Meus agendamentos</h2>
      <form onSubmit={buscar}>
        <label>Telefone:</label>
        <br />
        <input
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="11999999999"
        />
        <br />
        <br />
        <button type="submit">Buscar</button>
      </form>

      {mensagem && <p style={{ marginTop: "16px" }}>{mensagem}</p>}

      <ul style={{ listStyle: "none", padding: 0, marginTop: "24px" }}>
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
            {editando === a.id ? (
              <div>
                <label>Nome:</label>
                <br />
                <input
                  value={formNome}
                  onChange={(e) => setFormNome(e.target.value)}
                />
                <br />
                <br />
                <span>Serviços:</span>
                <div>
                  {SERVICOS.map((s) => (
                    <label key={s} style={{ display: "block" }}>
                      <input
                        type="checkbox"
                        checked={formServicos.includes(s)}
                        onChange={() => toggleServico(s)}
                      />{" "}
                      {s}
                    </label>
                  ))}
                </div>
                <br />
                <label>Data e hora:</label>
                <br />
                <input
                  type="datetime-local"
                  value={formData}
                  onChange={(e) => setFormData(e.target.value)}
                />
                <br />
                <br />
                <button type="button" onClick={salvar}>
                  Salvar
                </button>{" "}
                <button type="button" onClick={() => setEditando(null)}>
                  Cancelar
                </button>
              </div>
            ) : (
              <div>
                <div>
                  <strong>{a.cliente_nome}</strong>
                </div>
                <div>
                  <strong>Serviços:</strong> {a.servicos.join(", ")}
                </div>
                <div>
                  <strong>Data e hora:</strong> {a.data_hora}
                </div>
                <div style={{ marginTop: "10px" }}>
                  {podeEditar(a.data_hora) ? (
                    <button type="button" onClick={() => iniciarEdicao(a)}>
                      Editar
                    </button>
                  ) : (
                    <small style={{ color: "#b71c1c" }}>
                      Para alterar, entre em contato com a Leila.
                    </small>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MeusAgendamentos;
