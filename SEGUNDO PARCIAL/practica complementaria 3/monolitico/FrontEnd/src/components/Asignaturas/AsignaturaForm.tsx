import React, { useState, FormEvent, ChangeEvent, useEffect, MouseEventHandler } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as AsignaturaServices from './AsignaturaServices'
import { toast } from 'react-toastify'
import { IAsignatura } from './IAsignatura';
import { getCurrentToken } from '../Authentication/AuthServices';

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;


const AsignaturaForm = () => {

    const navigate = useNavigate();
    const params = useParams();

    const initialState = { nombreMateria: '', creditos: '', codigo: ''};

    const [asignatura, setAsignatura] = useState<IAsignatura>(initialState);

    const handleInputChange = (e: InputChange) => {
        setAsignatura({ ...asignatura, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await AsignaturaServices.createAsignatura(asignatura);
        toast.success('Nueva asignatura agregada');
        setAsignatura(initialState);
        
        navigate('/recursos');
    }

    const handleUpdate: MouseEventHandler<HTMLButtonElement> = async () => {
        if (params.id) {
            await AsignaturaServices.UpdateAsignatura(params.id, asignatura);
            toast.info('Asignatura actualizada');
        }
        navigate('/recursos');
    }
    
    const handleDelete: MouseEventHandler<HTMLButtonElement> = async () => {
        if (params.id) {
            await AsignaturaServices.DeleteAsignatura(String(params.id)); 
            toast.warning('Asignatura eliminada');
        }
        navigate('/recursos');       
    }

    const getAsignatura = async (id: string) => {
        const res = await AsignaturaServices.getAsignatura(id);
        const { nombreMateria, creditos, codigo } = res.data;
        setAsignatura({ nombreMateria, creditos, codigo })
    }

    useEffect(() => {
        const token = getCurrentToken()
        if(!token) navigate('/login')
        if (params.id) (getAsignatura(params.id))
    }, [])
    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card m-5">
                    <div className="card-body">
                        {
                            !params.id ?
                            <h3 className='m-3'>Nueva Asignatura</h3>
                            :
                            <h3 className='m-3'>Actualizar Asignatura</h3>
                        }
                        <form onSubmit={handleSubmit}>
                            <div className="form-group m-3">
                                <input
                                    type="text"
                                    name="nombreMateria"
                                    placeholder='Escriba el nombre del docente'
                                    className='form-control'
                                    onChange={handleInputChange}
                                    value={asignatura.nombreMateria}
                                    autoFocus
                                />
                            </div>
                            <div className="form-group m-3">
                                <input
                                    type="text"
                                    name="codigo"
                                    placeholder='Código de la asignatura'
                                    className='form-control'
                                    onChange={handleInputChange}
                                    value={asignatura.codigo}
                                />
                            </div>
                            <div className="form-group m-3">
                                <input
                                    type="number"
                                    name="creditos"
                                    placeholder='Créditos de la asignatura'
                                    className='form-control'
                                    onChange={handleInputChange}
                                    value={asignatura.creditos}
                                />
                            </div>
                            {
                                !params.id ?
                                    <button className='btn btn-success m-3'>Agregar Asignatura</button>
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
                                                        <h5 className="modal-title" id="exampleModalLabel">¿Borrar Docente?</h5>
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

export default AsignaturaForm