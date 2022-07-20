import { httpConexion } from "../Authentication/AuthServices";
import { IDocente } from "./IDocente";

const http = httpConexion()

const API = 'http://localhost:8080/api'

export const getDocentes = async () =>{
    return await http.get<IDocente[]>(`${API}/docentes`);
}

export const createDocentes = async (docente: IDocente) =>{
    return await http.post(`${API}/docentes`, docente);
}

export const getDocente = async (id: string) =>{
    return await http.get<IDocente>(`${API}/docentes/${id}`);
}

export const UpdateDocente = async (id: string, docente: IDocente) =>{
    return await http.put<IDocente>(`${API}/docentes/${id}`, docente);
}

export const DeleteDocente = async (id: string) =>{
    return await http.delete<IDocente>(`${API}/docentes/${id}`);
}