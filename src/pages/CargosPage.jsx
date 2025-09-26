import { useEffect, useState } from "react";
import supabase from "../supabase/supabaseClient";

export default function CargosPage() {
  const [cargos, setCargos] = useState([]);
  const [formData, setFormData] = useState({ cargo: "", sueldo: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchCargos = async () => {
    const { data, error } = await supabase.from("cargos").select("*");
    if (!error) setCargos(data);
  };
  useEffect(() => { fetchCargos(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = editingId
      ? await supabase.from("cargos").update(formData).eq("id", editingId)
      : await supabase.from("cargos").insert([formData]);
    if (!error) {
      setFormData({ cargo: "", sueldo: "" });
      setEditingId(null);
      fetchCargos();
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("cargos").delete().eq("id", id);
    if (!error) fetchCargos();
  };

  const handleEdit = (c) => {
    setEditingId(c.id);
    setFormData({ cargo: c.cargo, sueldo: c.sueldo });
  };

  return (
    <div>
      <h1>Cargos</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input name="cargo" value={formData.cargo} onChange={handleChange} placeholder="Cargo" required />
        <input name="sueldo" value={formData.sueldo} onChange={handleChange} placeholder="Sueldo" required />
        <button type="submit">{editingId ? "Actualizar" : "Agregar"}</button>
      </form>

      <table border="1" cellPadding="5">
        <thead>
          <tr><th>ID</th><th>Cargo</th><th>Sueldo</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {cargos.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.cargo}</td>
              <td>{c.sueldo}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Editar</button>
                <button onClick={() => handleDelete(c.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

