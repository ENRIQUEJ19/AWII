import { Request, Response } from 'express'
import { Docentes } from '../models'
import { IDocente } from '../interfaces'
import jwt, { JwtPayload } from 'jsonwebtoken'
const obtenerDocentes = async (req: Request, res: Response) => {
    const token = req.header('auth-token')
    const {id} = jwt.decode(String(token)) as JwtPayload

    const query = {$and: [
        {estado: true },
        {user: id }
    ]}

    try {
        const ListaDocentes: IDocente[] = await Docentes.find(query)
        res.json(ListaDocentes)
    } catch (error) {
        console.error(error);
    }
}

const obtenerDocente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const docente: IDocente|null = await Docentes.findById(id);
    res.json(docente);
}

const crearDocente = async (req: Request, res: Response) => {
    const { estado, ...body } = req.body as IDocente;
    const token = req.header('auth-token')
    const {id} = jwt.decode(String(token)) as JwtPayload

    const existeDocente = await Docentes.findOne({$and: [
        {nombredocente: body.nombredocente},
        {apellidodocente: body.apellidodocente},
        {user: id}
    ]});
    if (existeDocente) {
        return res.status(400).send({
            message: `El Docente con ese nombre ${body.nombredocente} y con este apellido ${body.apellidodocente} ya se encuentra registrado`
        })
    }
    body.user = id
    const docente = new Docentes(body);
    const DocenteNuevo = await docente.save();
    return res.status(201).json(DocenteNuevo);
}

const actualizarDocente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { estado, ...body } = req.body as IDocente;
    const DocenteModificado: IDocente|null = await Docentes.findByIdAndUpdate(id, body, {new: true})
    if(!DocenteModificado) res.status(404).send({message: "Docente no encontrado"})
    res.json(DocenteModificado);
}

const borrarDocente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const DocenteEliminado: IDocente|null = await Docentes.findByIdAndDelete(id)
    res.json(DocenteEliminado);
}

export {
    obtenerDocentes,
    obtenerDocente,
    crearDocente,
    actualizarDocente,
    borrarDocente,
}