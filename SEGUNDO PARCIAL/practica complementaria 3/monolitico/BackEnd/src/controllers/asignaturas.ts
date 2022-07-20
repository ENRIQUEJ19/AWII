import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IAsignatura } from '../interfaces'
import { Asignatura } from '../models';


const obtenerAsignaturas = async (req: Request, res: Response) => {
    const token = req.header('auth-token')
    const {id} = jwt.decode(String(token)) as JwtPayload

    const query = {$and: [
        {estado: true },
        {user: id }
    ]}

    try {
        const asignaturas: IAsignatura[] = await Asignatura.find(query)
        res.json(asignaturas)
    } catch (error) {
        console.error(error);
    }
}

const obtenerAsignatura = async (req: Request, res: Response) => {
    const { id } = req.params;
    const asignatura: IAsignatura|null = await Asignatura.findById(id);
    res.json(asignatura);
}

const crearAsignatura = async (req: Request, res: Response) => {
    const { estado, ...body } = req.body as IAsignatura;
    const token = req.header('auth-token')
    const {id} = jwt.decode(String(token)) as JwtPayload

    const existeAsignatura = await Asignatura.findOne({$and: [
        {codigo: body.codigo},
        {user: id}
    ]});
    if (existeAsignatura) {
        return res.status(400).send({
            message: `La asignatura con ese codigo ${body.codigo} ya se encuentra registrada`
        })
    }
    body.user = id
    const asignatura = new Asignatura(body);
    const AsignaturaNuevo = await asignatura.save();
    return res.status(201).json(AsignaturaNuevo);
}

const actualizarAsignatura = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { estado, ...body } = req.body as IAsignatura;
    const AsignaturaModificado: IAsignatura|null = await Asignatura.findByIdAndUpdate(id, body, { new: true })
    if(!AsignaturaModificado) res.status(404).send({message: "Asignatura no encontrado"})
    res.json(AsignaturaModificado);
}

const borrarAsignatura = async (req: Request, res: Response) => {
    const { id } = req.params;
    const AsignaturaEliminada: IAsignatura|null = await Asignatura.findByIdAndDelete(id)
    res.json(AsignaturaEliminada);
}


export {
    obtenerAsignaturas,
    obtenerAsignatura,
    crearAsignatura,
    actualizarAsignatura,
    borrarAsignatura
}