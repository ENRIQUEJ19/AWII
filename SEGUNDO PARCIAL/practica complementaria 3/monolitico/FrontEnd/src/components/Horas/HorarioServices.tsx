import { httpConexion } from "../Authentication/AuthServices";
import { IHorario } from "./IHorario";

const http = httpConexion()

const API = 'http://localhost:8080/api'

export const getHorarios = async () =>{
    return await http.get<IHorario[]>(`${API}/registro`);
}

export const getHorario = async (id: string) =>{
    return await http.get<IHorario>(`${API}/registro/${id}`);
}

export const createHorario = async (horario: IHorario) =>{
    return await http.post(`${API}/registro`, horario)
}

export const updateHorario = async (id: string, horario: IHorario) =>{
    return await http.put<IHorario>(`${API}/registro/${id}`, horario)
}

export const deleteHorario = async (id: string) =>{
    return await http.delete<IHorario>(`${API}/registro/${id}`)
}