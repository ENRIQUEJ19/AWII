import { httpConexion } from "../Authentication/AuthServices";
import { IDetalleHora } from "./IDetalleHora";

const http = httpConexion()

const API = 'http://localhost:8080/api'

export const getDetalleHoras = async () =>{
    return await http.get<IDetalleHora[]>(`${API}/detalleHora`);
}

export const createDetalleHora = async (detalleHora: IDetalleHora) =>{
    return await http.post(`${API}/detalleHora`, detalleHora);
}

export const getDetalleHora = async (id: string) =>{
    return await http.get<IDetalleHora>(`${API}/detalleHora/${id}`);
}

export const UpdateDetalleHora = async (id: string, detalleHora: IDetalleHora) =>{
    return await http.put<IDetalleHora>(`${API}/detalleHora/${id}`, detalleHora);
}

export const DeleteDetalleHora = async (id: string) =>{
    return await http.delete<IDetalleHora>(`${API}/detalleHora/${id}`);
}