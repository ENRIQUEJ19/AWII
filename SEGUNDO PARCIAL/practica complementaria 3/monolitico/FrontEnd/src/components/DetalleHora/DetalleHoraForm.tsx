import React, { useState, FormEvent, ChangeEvent, useEffect, MouseEventHandler } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as DetalleServices from './DetalleServices'
import { toast } from 'react-toastify'
import { IDetalleHora } from './IDetalleHora';
import * as DocenteServices from '../Docentes/DocenteServices';
import * as AsignaturaServices from '../Asignaturas/AsignaturaServices';
import { IDocente } from '../Docentes/IDocente';
import { IAsignatura } from '../Asignaturas/IAsignatura';
import { getCurrentToken } from '../Authentication/AuthServices';

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;


const DetalleHoraForm = () => {

    const navigate = useNavigate();
    const params = useParams();

    const initialState = { dia: '', asignatura: '', horaInicio: '', horaFin: '' };

    const [detalleHora, setDetalleHora] = useState<IDetalleHora>(initialState);

    const handleInputChange = (e: InputChange) => {
        setDetalleHora({ ...detalleHora, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await DetalleServices.createDetalleHora(detalleHora);
        toast.success('Nueva hora agregada');
        setDetalleHora(initialState);
        
        navigate('/');
    }

    const handleUpdate: MouseEventHandler<HTMLButtonElement> = async () => {
        if (params.id) {
            await DetalleServices.UpdateDetalleHora(params.id, detalleHora);
            toast.info('Asignatura actualizada');
        }
        navigate('/');
    }
    
    const handleDelete: MouseEventHandler<HTMLButtonElement> = async () => {
        if (params.id) {
            await DetalleServices.DeleteDetalleHora(String(params.id)); 
            toast.warning('Asignatura eliminada');
        }
        navigate('/');       
    }

    const getDetalleHora = async (id: string) => {
        const res = await DetalleServices.getDetalleHora(id);
        const { dia, asignatura, horaInicio, horaFin, nivel, aula, paralelo, docente } = res.data;
        setDetalleHora({ dia, asignatura, horaInicio, horaFin, nivel, aula, paralelo, docente })
    }


    const [docentes, setDocentes] = useState<IDocente[]>([])

    const loadDocentes = async () => {
        const res = await DocenteServices.getDocentes();
        setDocentes(res.data);
    }

    const [asignaturas, setAsignaturas] = useState<IAsignatura[]>([])

    const loadAsignaturas = async () => {
        const res = await AsignaturaServices.getAsignaturas();
        setAsignaturas(res.data);
    }

    useEffect(() => {
        const token = getCurrentToken()
        if (!token) navigate('/login')
        if (params.id) (getDetalleHora(params.id))
        loadAsignaturas();
        loadDocentes();

    }, [])

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card m-5">
                    <div className="card-body">
                        {
                            !params.id ?
                                <h3 className='m-3'>Nueva Hora</h3>
                                :
                                <h3 className='m-3'>Actualizar Hora</h3>
                        }
                        <form onSubmit={handleSubmit}>
                            <div className="form-group m-3">
                                <input
                                    type="text"
                                    name='dia'
                                    className='form-control'
                                    list='inputGroupSelect01'
                                    placeholder='Día'
                                    onChange={handleInputChange}
                                    value={detalleHora.dia}
                                />
                                <datalist className="form-select" id="inputGroupSelect01" hidden>
                                    <option value='Lunes'>Lunes</option>
                                    <option value='Martes'>Martes</option>
                                    <option value='Miércoles'>Miércoles</option>
                                    <option value='Jueves'>Jueves</option>
                                    <option value='Viernes'>Viernes</option>
                                    <option value='Sábado'>Sábado</option>
                                </datalist>
                            </div>
                            <div className="form-group m-3">
                                <input
                                    type="text"
                                    name='asignatura'
                                    className='form-control'
                                    list='input-asignaturas'
                                    placeholder='Asignatura'
                                    onChange={handleInputChange}
                                    value={detalleHora.asignatura}
                                />
                                <datalist className="form-select" id="input-asignaturas" hidden>
                                    <option disabled selected>Asignatura: </option>
                                    {
                                        asignaturas.map((asignatura) => {
                                            return <option value={asignatura.nombreMateria}>{asignatura.nombreMateria}</option>
                                        })
                                    }
                                </datalist>
                            </div>
                            <div className="form-group m-3">
                                <label className='form-label ms-2' htmlFor="horaInicio">Inicia: </label>
                                <input
                                    type='time'
                                    name="horaInicio"
                                    min='07:00'
                                    max='20:00'
                                    id='horaInicio'
                                    placeholder='Hora de Inicio (00:00)'
                                    className='form-control'
                                    onChange={handleInputChange}
                                    value={detalleHora.horaInicio}
                                />
                            </div>
                            <div className="form-group m-3">
                                <label className='form-label ms-2' htmlFor="horaInicio">Finaliza: </label>
                                <input
                                    type='time'
                                    name="horaFin"
                                    min='08:00'
                                    max='21:00'
                                    id='horaFin'
                                    placeholder='Hora de Fin (00:00)'
                                    className='form-control'
                                    onChange={handleInputChange}
                                    value={detalleHora.horaFin}
                                />
                            </div>
                            <div className="form-group m-3">
                                <input
                                    type="text"
                                    name='docente'
                                    className='form-control'
                                    list='input-docentes'
                                    placeholder='Docente'
                                    onChange={handleInputChange}
                                    value={detalleHora.docente}
                                />
                                <datalist className="form-select form-control" id="input-docentes" hidden>
                                    <option disabled selected>Docente: </option>
                                    {
                                        docentes.map((docente) => {
                                            return <option value={`${docente.nombredocente} ${docente.apellidodocente}`} hidden>{docente.nombredocente} {docente.apellidodocente}</option>
                                        })
                                    }
                                </datalist>
                            </div>
                            <div className="form-group m-3">
                                <input
                                    type='number'
                                    min='1'
                                    max='10'
                                    name="nivel"
                                    placeholder='Nivel'
                                    className='form-control'
                                    onChange={handleInputChange}
                                    value={detalleHora.nivel}
                                />
                            </div>
                            <div className="form-group m-3">
                                <input
                                    type='text'
                                    name="aula"
                                    placeholder='Número de aula'
                                    className='form-control'
                                    onChange={handleInputChange}
                                    value={detalleHora.aula}
                                />
                            </div>
                            <div className="form-group m-3">
                                <input
                                    type='text'
                                    name="paralelo"
                                    placeholder='Paralelo'
                                    list='input-paralelo'
                                    className='form-control'
                                    onChange={handleInputChange}
                                    value={detalleHora.paralelo}
                                />
                                <datalist className="form-select" id="input-paralelo" hidden>
                                    <option value='A'>A</option>
                                    <option value='B'>B</option>
                                    <option value='C'>C</option>
                                    <option value='D'>D</option>
                                    <option value='E'>E</option>
                                </datalist>
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

export default DetalleHoraForm