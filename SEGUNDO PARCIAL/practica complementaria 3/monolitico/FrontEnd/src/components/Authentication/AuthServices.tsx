import axios, { AxiosInstance } from "axios";
import { ILogin } from "./ILogin";
import { IResUsuario, IUsuario } from "./IUsuario";

const API = 'http://localhost:8080/api/usuarios'

export const httpConexion  = () => {
    return axios.create({
        headers: {
            'Content-Type': 'application/json',
            'auth-token': getCurrentToken()
        }
    })
}

export const registrarUsuario = async (usuario: IUsuario) =>{
    return await axios.post(`${API}`, usuario);
}

export const logIn = async (login: ILogin) =>{
    return await axios.post(`${API}/login`, login);
}
export const logOut = async () =>{
    localStorage.removeItem("user");
    return await axios.post(`${API}/loggout`);
}

export const getCurrentToken = () => {
    const userStr = localStorage.getItem("user");
    const user =  JSON.parse(String(userStr))
    if (userStr) return user.data.token;
    return null;
}

// export const getUsuarios = async () =>{
//     const http = httpConexion()
//     return await http.get<IResUsuario[]>(`${API}`);
// }

// export const getUsuario = async (id: string) =>{
//     const http = httpConexion()
//     return await http.get<IUsuario>(`${API}/${id}`);
// }

// export const updateUsuario = async (id: string, usuario: IUsuario) =>{
//     const http = httpConexion()
//     return await http.put<IUsuario>(`${API}/${id}`, usuario);
// }

// export const deleteUsuario = async (id: string) =>{
//     const http = httpConexion()
//     return await http.delete<IUsuario>(`${API}/${id}`);
// }