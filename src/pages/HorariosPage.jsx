import { useEffect, useState } from "react";
import supabase from "../supabase/supabaseClient";

export default function HorariosPage() {
  const [horarios, setHorarios] = useState([]);
  const [formData, setFormData] = useState({ hora_ingreso: "", hora_salida: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchHorarios = async () => {
    const { data, error } = await supabase.from("horarios").select("*");
    if (!error) setHorarios(data);
  };
  useEffect(() => { fetchHorarios(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = editingId
      ? await supabase.from("horarios").update(formData).eq("id", editingId)
      : await supabase.from("horarios").insert([formData]);
    if (!error) {
      setFormData({ hora_ingreso: "", hora_salida: "" });
      setEditingId(null);
      fetchHorarios();
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("horarios").delete().eq("id", id);
    if (!error) fetchHorarios();
  };

  const handleEdit = (h) => {
    setEditingId(h.id);
    setFormData({ hora_ingreso: h.hora_ingreso, hora_salida: h.hora_salida });
  };

  return (
    <div>
      <h1>Horarios</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input type="time" name="hora_ingreso" value={formData.hora_ingreso} onChange={handleChange} required />
        <input type="time" name="hora_salida" value={formData.hora_salida} onChange={handleChange} required />
        <button type="submit">{editingId ? "Actualizar" : "Agregar"}</button>
      </form>

      <table border="1" cellPadding="5">
        <thead>
          <tr><th>ID</th><th>Hora Ingreso</th><th>Hora Salida</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {horarios.map(h => (
            <tr key={h.id}>
              <td>{h.id}</td>
              <td>{h.hora_ingreso}</td>
              <td>{h.hora_salida}</td>
              <td>
                <button onClick={() => handleEdit(h)}>Editar</button>
                <button onClick={() => handleDelete(h.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
