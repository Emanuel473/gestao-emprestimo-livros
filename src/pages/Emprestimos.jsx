import React, { useState } from "react";
import "../styles/Emprestimos.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ArrowLeft } from "lucide-react";

const loans = [
  {
    book: "1984",
    user: "João Silva",
    pickup: "05/06/2026",
    due: "12/06/2026",
    status: "Em andamento",
    statusClass: "status--progress",
  },
  {
    book: "Dom Casmurro",
    user: "Maria Gomes",
    pickup: "01/06/2026",
    due: "08/06/2026",
    status: "Devolvido",
    statusClass: "status--returned",
  },
  {
    book: "O Ateneu",
    user: "Carlos Lima",
    pickup: "28/05/2026",
    due: "04/06/2026",
    status: "Atrasado",
    statusClass: "status--late",
  },
];

export default function Emprestimos() {
  const [pesquisa, setPesquisa] = useState("");

  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <Header pesquisa={pesquisa} setPesquisa={setPesquisa} />

        <div className="page-title">
          <ArrowLeft size={18} className="back-arrow" />
          <h1>Empréstimos Ativos</h1>
        </div>

        <div className="table-wrapper">
          <table className="loans-table">
            <thead>
              <tr>
                <th>Livro</th>
                <th>Usuário</th>
                <th>Retirada</th>
                <th>Devolução</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.book}>
                  <td>{loan.book}</td>
                  <td>{loan.user}</td>
                  <td>{loan.pickup}</td>
                  <td>{loan.due}</td>
                  <td>
                    <span className={`status ${loan.statusClass}`}>
                      {loan.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}