import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
 
const UserForm = ({ onSubmit, editingUser, isEditing = false }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    username: '',
    password: '',
    edad: ''
  })
 
  useEffect(() => {
    if (editingUser) {
      setFormData({
        nombre: editingUser.nombre || '',
        email: editingUser.email || '',
        username: editingUser.username || '',
        password: '', // No mostrar password por seguridad
        edad: editingUser.edad || ''
      })
    }
  }, [editingUser])
 
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
 
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const dataToSubmit = { ...formData }
    if (isEditing && !dataToSubmit.password) {
      delete dataToSubmit.password // No actualizar password si está vacío
    }
    if (dataToSubmit.edad) {
      dataToSubmit.edad = parseInt(dataToSubmit.edad)
    }
    
    onSubmit(dataToSubmit)
  }
 
  const handleCancel = () => {
    navigate('/users')
  }
 
  return (
    <div className="form-container">
      <h2>{isEditing ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>
      
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
 
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
 
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
 
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!isEditing}
            placeholder={isEditing ? 'Dejar vacío para no cambiar' : ''}
          />
        </div>
 
        <div className="form-group">
          <label htmlFor="edad">Edad:</label>
          <input
            type="number"
            id="edad"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
          />
        </div>
 
        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
          </button>
          <button type="button" onClick={handleCancel} className="cancel-btn">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
 
export default UserForm
 