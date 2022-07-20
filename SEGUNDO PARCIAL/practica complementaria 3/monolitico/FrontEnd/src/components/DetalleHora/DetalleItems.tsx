import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { IDetalleHora } from './IDetalleHora'
import './../../App.css';
import * as DocenteServices from './DetalleServices'
import { getCurrentToken } from '../Authentication/AuthServices';

interface Props {
    detalleHora: IDetalleHora,
    loadDetalleHoras: () => void
}

const DetalleItems = ({ detalleHora, loadDetalleHoras }: Props) => {

    const handleDelete = async (id: string) => {
        await DocenteServices.DeleteDetalleHora(id);
        loadDetalleHoras();
      }

    const navigate = useNavigate();
    useEffect(()=>{
        const token = getCurrentToken()
        if(!token) navigate('/login')
    }, [])
    return (
        <div className='col-md-6'>
            <div className="card card-body m-4 detalleHora-card">
                <div className='d-flex justify-content-end'>
                <i className="fa fa-edit btn-edit"
                onClick={() => { navigate(`/updateDetalleHora/${detalleHora._id}`) }}
                ></i>
                </div>
                <div className="d-flex justify-content-center">
                    <h2>{detalleHora.dia}</h2>
                </div>
                <div className="d-flex justify-content-center">
                    <h2>{detalleHora.asignatura}</h2>
                </div>
                <div className="d-flex justify-content-center">
                    <h3>{detalleHora.docente}</h3>
                </div>
                <h6 className='d-flex justify-content-center'>
                    Hora Inicio: {detalleHora.horaInicio} - Hora Fin: {detalleHora.horaFin}
                </h6>
                <h6 className='d-flex justify-content-center'>Nivel: {detalleHora.nivel}</h6>
                <h6 className='d-flex justify-content-center'>Aula: {detalleHora.aula}</h6>
                <h6 className='d-flex justify-content-center'>Paralelo: {detalleHora.paralelo}</h6>
            </div>
        </div>
    )
}

export default DetalleItems