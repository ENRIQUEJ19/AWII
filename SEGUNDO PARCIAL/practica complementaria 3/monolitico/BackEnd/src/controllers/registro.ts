import {Request, Response} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {IRegistro} from "../interfaces";
import {Registro} from "../models";



const obtenerRegistros = async (req: Request, res: Response) => {
    const token = req.header('auth-token')
    const {id} = jwt.decode(String(token)) as JwtPayload

    const query = {$and: [
        {estado: true },
        {user: id }
    ]}

    try {
        const Registros: IRegistro[] = await Registro.find(query)
        res.json(Registros)
    } catch (error) {
        console.error(error);
        
    }
}

const obtenerRegistro = async (req: Request, res: Response) => {
    const { id } = req.params;
    const registro: IRegistro|null = await Registro.findById(id);
    res.json(registro);
}

const crearRegistro = async (req: Request, res: Response) => {
    const { estado, ...body } = req.body as IRegistro;
    const token = req.header('auth-token')
    const {id} = jwt.decode(String(token)) as JwtPayload
    
    const existeRegistro: IRegistro|null = await Registro.findOne({$and: [
        {periodo: body.periodo},
        {user: id}
    ]});
    if (existeRegistro) {
        return res.status(400).json({
            message: `El registro para este periodo ${body.periodo} ya se encuentra registrado`
        })
    }
    

    body.user = id
    const registro = new Registro(body);
    const RegistroNuevo: IRegistro|null = await registro.save();
    return res.status(201).json(RegistroNuevo);
}

const actualizarRegistro = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { estado, ...body } = req.body as IRegistro;
    const RegistroModificado: IRegistro|null = await Registro.findByIdAndUpdate(id, body, { new: true });
    if(!RegistroModificado) res.status(404).send({message: "Registro no encontrado"})
    res.json(RegistroModificado);
}

const borrarRegistro = async (req: Request, res: Response) => {
    const { id } = req.params;
    const RegistroEliminado: IRegistro|null = await Registro.findByIdAndDelete(id);
    res.json(RegistroEliminado);
}

export {
    obtenerRegistros,
    obtenerRegistro,
    crearRegistro,
    actualizarRegistro,
    borrarRegistro
}
