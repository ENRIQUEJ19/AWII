import React, { useState, FormEvent, ChangeEvent, useEffect, MouseEventHandler } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as HorarioServices from './HorarioServices'
import { toast } from 'react-toastify'
import { IHorario } from './IHorario';
import { getCurrentToken } from '../Authentication/AuthServices';

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;


const HorarioForm = () => {

    const navigate = useNavigate();
    const params = useParams();

    const initialState = { periodo: '', nivel: '' };

    const [horario, setHorario] = useState<IHorario>(initialState);

    const handleInputChange = (e: InputChange) => {
        setHorario({ ...horario, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        await HorarioServices.createHorario(horario);
        toast.success('Nuevo horario agregado');
        setHorario(initialState);
        
        navigate('/');
    }
    
    const handleUpdate: MouseEventHandler<HTMLButtonElement> = async () => {
        if (params.id) {
            await HorarioServices.updateHorario(params.id, horario);
            toast.info('Horario actualizado');
        }
        navigate('/');
    }
    
    const handleDelete: MouseEventHandler<HTMLButtonElement> = async () => {
        if (params.id) {
            await HorarioServices.deleteHorario(String(params.id)); 
            toast.warning('Horario eliminado');
        }
        navigate('/');       
    }

    const getHorario = async (id: string) => {
        const res = await HorarioServices.getHorario(id);
        const { periodo, nivel } = res.data;
        setHorario({ periodo, nivel })
    }

    useEffect(() => {
        const token = getCurrentToken()
        if (params.id) (getHorario(params.id))
        if(!token) navigate('/login')
    }, [])
    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card m-5">
                    <div className="card-body">
                        {
                            !params.id ?
                            <h3 className='m-3'>Nuevo Horario</h3>
                            :
                            <h3 className='m-3'>Actualizar Horario</h3>
                        }
                        <form onSubmit={handleSubmit}>
                            <div className="form-group m-3">
                                <input
                                    type="text"
                                    name="periodo"
                                    placeholder='Escriba el periodo de su horario'
                                    className='form-control'
                                    onChange={handleInputChange}
                                    value={horario.periodo}
                                    autoFocus
                                />
                            </div>
                            <div className="form-group m-3">
                                <input
                                    type="text"
                                    name="nivel"
                                    placeholder='Escriba el nivel de su horario'
                                    className='form-control'
                                    onChange={handleInputChange}
                                    value={horario.nivel}
                                />
                            </div>
                            <div className="form-group m-3">
                                <input
                                    type="number"
                                    name="totalHoras"
                                    placeholder='Total de horas'
                                    className='form-control'
                                    onChange={handleInputChange}
                                />
                            </div>
                            {
                                !params.id ?
                                <button className='btn btn-success m-3'>Agregar Horario</button>
                                :
                                <></>
                            }
                        </form>
                        {
                            params.id ?
                                <div className='d-flex justify-content-between'>
                                    <button className='btn btn-warning m-3'
                                        onClick={handleUpdate}>Actualizar</button>
                                    <div>
                                        {/* Button trigger modal */}
                                        <button type="button" className="btn btn-danger m-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Borrar
                                        </button>
                                        {/* Modal */}
                                        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">¿Borrar Horario?</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                                        <button className='btn btn-danger m-3' data-bs-dismiss='modal'
                                                            onClick={handleDelete}>Borrar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HorarioForm