import {Request, Response} from "express";
import {IRegistro} from "./IRegistro";
import {Registro} from "./model";



const obtenerRegistros = async (req: Request, res: Response) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, Registros]:[Number, IRegistro[]] = await Promise.all([
        Registro.countDocuments(query),
        Registro.find(query)
        .skip(Number(desde))
        .limit(Number(limite)),
    ])

    res.json({
        total,
        Registros
    })
}

const obtenerRegistro = async (req: Request, res: Response) => {
    const { id } = req.params;
    const registro: IRegistro|null = await Registro.findById(id);
    res.json(registro);
}

const crearRegistro = async (req: Request, res: Response) => {
    const { estado, ...body } = req.body as IRegistro;
    const existeRegistro: IRegistro|null = await Registro.findOne({periodo: body.periodo});
    if (existeRegistro) {
        return res.status(400).json({
            message: `El registro para este periodo ${body.periodo} ya se encuentra registrado`
        })
    }
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
    const RegistroEliminado: IRegistro|null = await Registro.findByIdAndUpdate(id, { estado: false }, { new: true })
    res.json(RegistroEliminado);
}

export {
    obtenerRegistros,
    obtenerRegistro,
    crearRegistro,
    actualizarRegistro,
    borrarRegistro
}
