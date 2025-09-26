import { useEffect, useState } from "react";
import supabase from "../supabase/supabaseClient";

export default function TickeosPage() {
  const [tickeos, setTickeos] = useState([]);
  const [formData, setFormData] = useState({
    id_usuario: "",
    hora_entrada: "",
    tipo: "entrada",
    hora_salida: "",
    tipo1: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchTickeos = async () => {
    const { data, error } = await supabase.from("tickeos").select("*");
    if (!error) setTickeos(data);
    else console.error("Error cargando tickeos:", error);
  };

  useEffect(() => {
    fetchTickeos();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userId = formData.id_usuario;

    // Si no hay id_usuario, creamos un usuario nuevo automáticamente
    if (!userId) {
      const { data: newUser, error: userError } = await supabase
        .from("usuarios")
        .insert([
          {
            nombre: "Usuario_" + Date.now(),
            email: `user${Date.now()}@mail.com`,
            edad: 0
          }
        ])
        .select("id")
        .single();

      if (userError) {
        console.error("Error creando usuario automáticamente:", userError);
        return;
      }
      userId = newUser.id;
    }

    const { error } = editingId
      ? await supabase
          .from("tickeos")
          .update({
            ...formData,
            id_usuario: userId
          })
          .eq("id", editingId)
      : await supabase.from("tickeos").insert([
          {
            ...formData,
            id_usuario: userId
          }
        ]);

    if (error) {
      console.error("Error guardando tickeo:", error);
      return;
    }

    setFormData({
      id_usuario: "",
      hora_entrada: "",
      tipo: "entrada",
      hora_salida: "",
      tipo1: ""
    });
    setEditingId(null);
    fetchTickeos();
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("tickeos").delete().eq("id", id);
    if (!error) fetchTickeos();
    else console.error("Error eliminando tickeo:", error);
  };

  const handleEdit = (t) => {
    setEditingId(t.id);
    setFormData({
      id_usuario: t.id_usuario || "",
      hora_entrada: t.hora_entrada,
      tipo: t.tipo,
      hora_salida: t.hora_salida || "",
      tipo1: t.tipo1 || ""
    });
  };

  return (
    <div>
      <h1>Tickeos</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="id_usuario"
          value={formData.id_usuario}
          onChange={handleChange}
          placeholder="ID Usuario (opcional, se crea uno nuevo si lo dejas vacío)"
        />
        <input
          type="time"
          name="hora_entrada"
          value={formData.hora_entrada}
          onChange={handleChange}
          required
        />
        <select name="tipo" value={formData.tipo} onChange={handleChange}>
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
        </select>
        <input
          type="time"
          name="hora_salida"
          value={formData.hora_salida}
          onChange={handleChange}
          placeholder="Hora Salida"
        />
        <input
          name="tipo1"
          value={formData.tipo1}
          onChange={handleChange}
          placeholder="Tipo1"
        />
        <button type="submit">
          {editingId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Usuario</th>
            <th>Hora Entrada</th>
            <th>Tipo</th>
            <th>Hora Salida</th>
            <th>Tipo1</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tickeos.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.id_usuario}</td>
              <td>{t.hora_entrada}</td>
              <td>{t.tipo}</td>
              <td>{t.hora_salida}</td>
              <td>{t.tipo1}</td>
              <td>
                <button onClick={() => handleEdit(t)}>Editar</button>
                <button onClick={() => handleDelete(t.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
