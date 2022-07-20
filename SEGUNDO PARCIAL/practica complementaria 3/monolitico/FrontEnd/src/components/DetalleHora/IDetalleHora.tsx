export interface IDetalleHora {
    dia: string,
    horaInicio: string,
    horaFin: string,
    asignatura: string,
    docente?: string,
    nivel?: number,
    aula?: number,
    paralelo?: string,
    estado?: Boolean,
    _id?: string
}