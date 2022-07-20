import { httpConexion } from "../Authentication/AuthServices";
import { IAsignatura } from "./IAsignatura";

const http = httpConexion()


const API = 'http://localhost:8080/api'

export const getAsignaturas = async () =>{
    return await http.get<IAsignatura[]>(`${API}/asignaturas`);
}

export const createAsignatura = async (asignatura: IAsignatura) =>{
    return await http.post(`${API}/asignaturas`, asignatura);
}

export const getAsignatura = async (id: string) =>{
    return await http.get<IAsignatura>(`${API}/asignaturas/${id}`);
}

export const UpdateAsignatura = async (id: string, asignatura: IAsignatura) =>{
    return await http.put<IAsignatura>(`${API}/asignaturas/${id}`, asignatura);
}

export const DeleteAsignatura = async (id: string) =>{
    return await http.delete<IAsignatura>(`${API}/asignaturas/${id}`);
}