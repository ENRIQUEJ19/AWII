import { Request, Response } from 'express';
import { IDetalleHora } from '../interfaces';
import { DetalleHora } from '../models';
import jwt, { JwtPayload } from 'jsonwebtoken'


const obtenerHoras = async (req: Request, res: Response) => {
    const token = req.header('auth-token')
    const {id} = jwt.decode(String(token)) as JwtPayload

    const query = {$and: [
        {estado: true },
        {registro: id }
    ]}

    try {
        const DetalleHoras: IDetalleHora[] = await DetalleHora.find(query)
        res.json(DetalleHoras)
    } catch (error) {
        console.error(error);
        
    }
}

const obtenerHora = async (req: Request, res: Response) => {
    const { id } = req.params;
    const hora: IDetalleHora|null = await DetalleHora.findById(id);
    res.json(hora);
}

const agregarHora = async (req: Request, res: Response) => {
    const { estado, ...body } = req.body as IDetalleHora;
    
    const token = req.header('auth-token')
    const {id} = jwt.decode(String(token)) as JwtPayload

    const existeHora = await DetalleHora.findOne({$and: [
        {dia: body.dia},
        {horaInicio: body.horaInicio},
        {horaFin: body.horaFin},
        {registro: id}
    ]});
    if (existeHora) {
        return res.status(400).json({
            message: `La hora registrada con inicio a las ${body.horaInicio} y fin a las ${body.horaFin} el día ${body.dia} ya se encuentra agregado`
        })
    }
    body.registro = id
    const hora = new DetalleHora(body);
    const HoraNueva = await hora.save();
    return res.status(201).json(HoraNueva);
}

const actualizarHora = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { estado, ...body } = req.body as IDetalleHora;
    const HoraModificada: IDetalleHora|null = await DetalleHora.findByIdAndUpdate(id, body, { new: true });
    if(!HoraModificada) res.status(404).send({message: "Hora no registrada"})
    res.json(HoraModificada);
}

const borrarHora = async (req: Request, res: Response) => {
    const { id } = req.params;
    const HoraEliminada: IDetalleHora|null = await DetalleHora.findByIdAndUpdate(id, { estado: false }, { new: true })
    res.json(HoraEliminada);
}

export {
    obtenerHoras,
    obtenerHora,
    agregarHora,
    actualizarHora,
    borrarHora
}