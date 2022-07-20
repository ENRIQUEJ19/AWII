import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { IDocente } from './IDocente'
import './../../App.css';
import { getCurrentToken } from '../Authentication/AuthServices';

interface Props {
    docente: IDocente
}

const DocenteItems = ({ docente }: Props) => {

    const navigate = useNavigate();
    useEffect(()=>{
        const token = getCurrentToken()
        if(!token) navigate('/login')
    },[])
    return (
        <div className='col-md-4'>
            <div className="card card-body m-4 docente-card">
                <div className='d-flex justify-content-end'>
                    <i className="fa fa-edit btn-edit"
                    onClick={() => { navigate(`/update/${docente._id}`) }}
                    ></i>
                </div>
                <div className="d-flex justify-content-center">
                    <h2>{docente.nombredocente}</h2>
                </div>
                <div className="d-flex justify-content-center">
                    <h2>{docente.apellidodocente}</h2>
                </div>
                <p className='d-flex justify-content-center'>{docente.email}</p>
                <p className='d-flex justify-content-center'>Teléfono: {docente.telefono}</p>
            </div>
        </div>
    )
}

export default DocenteItems