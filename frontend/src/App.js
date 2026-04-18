import { useState } from "react";
import Agendamento from "./Agendamento";
import MeusAgendamentos from "./MeusAgendamentos";

function App() {
  const [tela, setTela] = useState("agendar");

  return (
    <div>
      <nav
        style={{
          padding: "16px 20px",
          background: "#f5f0eb",
          display: "flex",
          gap: "16px",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e0d6cc",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: 700,
            fontSize: "1.15rem",
            color: "#3e2723",
          }}
        >
          <span style={{ fontSize: "1.75rem", lineHeight: 1 }} aria-hidden>
            ✂️
          </span>
          <span>Cabeleleila Leila</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="button" onClick={() => setTela("agendar")}>
            Agendar
          </button>
          <button type="button" onClick={() => setTela("consultar")}>
            Meus agendamentos
          </button>
        </div>
      </nav>

      {tela === "agendar" && <Agendamento />}
      {tela === "consultar" && <MeusAgendamentos />}
    </div>
  );
}

export default App;
