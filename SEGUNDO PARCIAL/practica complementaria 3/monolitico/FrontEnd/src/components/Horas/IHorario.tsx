export interface IHorario {
  periodo: string,
  nivel: number | string,
  totalHoras?: number,
  docentes?: string[],
  asignaturas?: [],
  estado?: boolean,
  _id?: string
}