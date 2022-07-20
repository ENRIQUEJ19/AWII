import { Request, Response } from 'express';
import { IAula } from './IAulas'
import { Aula } from './model'

const consultarAulas = async (req: Request, res: Response) => {
    const query = { estado: true };
    try {
        const aulas: IAula[] = await Aula.find(query)
        res.json(aulas)
    } catch (error) {
        console.error(error);
    }
}

const consultarAula = async (req: Request, res: Response) => {
    const { id } = req.params;
    const aula: IAula|null = await Aula.findById(id);
    res.json(aula);
}

const crearAula = async (req: Request, res: Response) => {
    const { estado, ...body } = req.body as IAula;
    const existeAula = await Aula.findOne({$or: [
        {numeroDeAula: body.numeroDeAula}
    ]});
    if (existeAula) {
        return res.status(400).send({
            message: `El aula con el número ${body.numeroDeAula} ya se encuentra registrada`
        })
    }
    const aula = new Aula(body);
    const AulaNuevo = await aula.save();
    return res.status(201).json(AulaNuevo);
}

const actualizarAula = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { estado, ...body } = req.body as IAula;
    const AulaModificado: IAula|null = await Aula.findByIdAndUpdate(id, body, { new: true })
    if(!AulaModificado) res.status(404).send({message: "Aula no encontrada"})
    res.json(AulaModificado);
}

const borrarAula = async (req: Request, res: Response) => {
    const { id } = req.params;
    const AulaEliminado: IAula|null = await Aula.findByIdAndDelete(id)
    res.json(AulaEliminado);
}

export {
    consultarAulas,
    consultarAula,
    crearAula,
    actualizarAula,
    borrarAula
}