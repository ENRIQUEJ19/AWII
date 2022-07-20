import React, { useState, FormEvent, ChangeEvent, useEffect, MouseEventHandler } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as DocenteServices from './DocenteServices'
import { toast } from 'react-toastify'
import { IDocente } from './IDocente';
import { getCurrentToken } from '../Authentication/AuthServices';

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;


const DocentesForm = () => {

    const navigate = useNavigate();
    const params = useParams();

    const initialState = { nombredocente: '', apellidodocente: '', email: '', telefono: '' };

    const [docente, setdocente] = useState<IDocente>(initialState);

    const handleInputChange = (e: InputChange) => {
        setdocente({ ...docente, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await DocenteServices.createDocentes(docente);
        toast.success('Nuevo docente agregado');
        setdocente(initialState);

        navigate('/recursos');
    }

    const handleUpdate: MouseEventHandler<HTMLButtonElement> = async () => {
        if (params.id) {
            await DocenteServices.UpdateDocente(params.id, docente)
            toast.info('Docente actualizado');
        }
        navigate('/recursos');
    }

    const handleDelete: MouseEventHandler<HTMLButtonElement> = async () => {
        if (params.id) {
            await DocenteServices.DeleteDocente(params.id);
            toast.warning('Docente eliminado');
        }
        navigate('/recursos');
    }

    const getDocente = async (id: string) => {
        const res = await DocenteServices.getDocente(id);
        const { nombredocente, apellidodocente, email, telefono } = res.data;
        setdocente({ nombredocente, apellidodocente, email, telefono })
    }

    useEffect(() => {
        const token = getCurrentToken()
        if (!token) navigate('/login')
        if (params.id) (getDocente(params.id))
    }, [])
    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card m-5">
                    <div className="card-body">
                        {
                            !params.id ?
                                <h3 className='m-3'>Nuevo Docente</h3>
                                :
                                <h3 className='m-3'>Actualizar Docente</h3>
                        }
                        <form onSubmit={handleSubmit}>
                            <div className="form-group m-3">
                                <input
                                    type="text"
                                    name="nombredocente"
                                    placeholder='Escriba el nombre del docente'
                                    className='form-control'
                                    onChange={handleInputChange}
                                    value={docente.nombredocente}
                                    autoFocus
                                />
                            </div>
                            <div className="form-group m-3">
                                <input
                                    type="text"
                                    name="apellidodocente"
                                    placeholder='Escriba aquí los apellidos del docente'
                                    className='form-control'
                                    onChange={handleInputChange}
                                    value={docente.apellidodocente}
                                />
                            </div>
                            <div className="form-group m-3">
                                <input
                                    type='email'
                                    name="email"
                                    placeholder='example@example.com'
                                    className='form-control'
                                    onChange={handleInputChange}
                                    value={docente.email}
                                />
                            </div>
                            <div className="form-group m-3">
                                <input
                                    type='text'
                                    name="telefono"
                                    placeholder='0999999999'
                                    className='form-control'
                                    onChange={handleInputChange}
                                    value={docente.telefono}
                                />
                            </div>
                            {
                                !params.id ?
                                    <button className='btn btn-success m-3'>Agregar Docente</button>
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

export default DocentesForm