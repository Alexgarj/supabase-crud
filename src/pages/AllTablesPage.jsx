import { useEffect, useState } from "react";
import supabase from "../supabase/supabaseClient";

export default function AllTablesPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargos, setCargos] = useState([]);
  //const [cargosUsuarios, setCargosUsuarios] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [tickeos, setTickeos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);

    const [{ data: u }, { data: c }, { data: h }, { data: t }] =
      await Promise.all([
        supabase.from("usuarios").select("*"),
        supabase.from("cargos").select("*"),
        supabase.from("horarios").select("*"),
        supabase.from("tickeos").select("*"),
      ]);

    setUsuarios(u || []);
    setCargos(c || []);
    //setCargosUsuarios(cu || []);
    setHorarios(h || []);
    setTickeos(t || []);

    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Cargando datos...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 Todas las Tablas</h1>

      {/* USUARIOS */}
      <h2>Usuarios</h2>
      <Table
        headers={["ID", "Nombre", "Email", "Username", "Edad"]}
        rows={usuarios.map(u => [u.id, u.nombre, u.email, u.username, u.edad])}
      />

      {/* CARGOS */}
      <h2>Cargos</h2>
      <Table
        headers={["ID", "Cargo", "Sueldo"]}
        rows={cargos.map(c => [c.id, c.cargo, c.sueldo])}
      />

  

      {/* HORARIOS */}
      <h2>Horarios</h2>
      <Table
        headers={["ID", "Hora Ingreso", "Hora Salida"]}
        rows={horarios.map(h => [h.id, h.hora_ingreso, h.hora_salida])}
      />

      {/* TICKEOS */}
      <h2>Tickeos</h2>
      <Table
        headers={["ID", "ID Usuario", "Fecha", "Hora Entrada", "Tipo", "Hora Salida"]}
        rows={tickeos.map(t => [
          t.id,
          t.id_usuario,
          t.fecha,
          t.hora_entrada,
          t.tipo,
          t.hora_salida || "-",
        ])}
      />
    </div>
  );
}

/* Componente reutilizable para las tablas */
function Table({ headers, rows }) {
  return (
    <table border="1" cellPadding="6" cellSpacing="0" style={{ marginBottom: 30 }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={headers.length} style={{ textAlign: "center" }}>
              Sin datos
            </td>
          </tr>
        ) : (
          rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
