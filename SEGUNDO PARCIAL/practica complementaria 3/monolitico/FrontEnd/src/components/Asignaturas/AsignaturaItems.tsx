import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { IAsignatura } from './IAsignatura'
import './../../App.css';
import { getCurrentToken } from '../Authentication/AuthServices';

interface Props {
    asignatura: IAsignatura,
}

const AsignaturaItems = ({ asignatura }: Props) => {

    const navigate = useNavigate();
    useEffect(() => {
        const token = getCurrentToken()
        if(!token) navigate('/login')
    }, [])
    return (
        <div className='col-md-6'>
            <div className="card card-body m-4 docente-card">
                <div className='d-flex justify-content-end'>
                <i className="fa fa-edit btn-edit"
                onClick={() => { navigate(`/updateAsignatura/${asignatura._id}`) }}
                ></i>
                </div>
                <div className="d-flex justify-content-center">
                    <h2>{asignatura.nombreMateria}</h2>
                </div>
                <h6 className='d-flex justify-content-center'>Créditos: {asignatura.creditos}</h6>
                <h6 className='d-flex justify-content-center'>Código: {asignatura.codigo}</h6>
            </div>
        </div>
    )
}

export default AsignaturaItems