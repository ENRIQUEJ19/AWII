import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IHorario } from './IHorario'
import './../../App.css';
import DetalleHoraList from '../DetalleHora/DetalleHoraList';
import { getCurrentToken } from '../Authentication/AuthServices';

interface Props {
    horario: IHorario,
}

const HorarioItems = ({ horario }: Props) => {

    const navigate = useNavigate();
    useEffect(()=>{
        const token = getCurrentToken()
        if(!token) navigate('/login')
    },[])
    return (
        <div className='col-md-12'>
            <div className="card card-body m-4 horario-card blur">
                <header className='ps-4'>
                  <div className="d-flex justify-content-between">
                      <h2>Periodo: {horario.periodo}</h2>
                      <i className="fa fa-edit btn-edit"
                      onClick={() => { navigate(`/updateHorario/${horario._id}`) }}
                      ></i>
                  </div>
                  <div className="d-flex justify-content">
                      <h2>Nivel: {horario.nivel}</h2>
                  </div>
                  <p className='d-flex justify-content'> Total de Horas: {horario.totalHoras}</p>
                </header>
                <div>
                  <DetalleHoraList/>
                </div>
                <div className='d-flex justify-content-end'>
                    <Link to={'/new-hora'} className='btn btn-outline-info ms-4 blur border-btn'>+ Agregar Hora</Link>
                </div>
            </div>
        </div>
    )
}

export default HorarioItems