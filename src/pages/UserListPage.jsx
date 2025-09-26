import { useEffect, useState } from "react";
import supabase from '../supabase/supabaseClient';
import UserList from "../components/UserList";


const UserListPage = () => {
    const [usuarios,setUsuarios] = useState([])


useEffect(() => {
  getUsuarios();
}, [])

async function getUsuarios() {
  const {data,error} = await supabase.from("usuarios").select();
  if(error){
    console.error(error);
    return;
  }
  setUsuarios(data);
  console.log(data);
}

return (
  <div className="page-container">
      <h1>User List</h1>
      <UserList usuarios={usuarios} />
  </div>
);
};

export default UserListPage;