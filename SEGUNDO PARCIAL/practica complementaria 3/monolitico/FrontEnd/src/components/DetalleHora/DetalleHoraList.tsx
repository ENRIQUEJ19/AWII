import React, { useEffect, useState } from 'react'
import { IDetalleHora } from './IDetalleHora';
import DetalleItems from './DetalleItems';
import * as detalleHoraServices from './DetalleServices';
import { useNavigate } from 'react-router-dom';
import { getCurrentToken } from '../Authentication/AuthServices';

const DetalleHoraList = () => {

    const navigate = useNavigate();

    const [detalleHora, setDetalleHora] = useState<IDetalleHora[]>([])

    const loadDetalleHoras = async()=>{
        const res = await detalleHoraServices.getDetalleHoras();
        setDetalleHora(res.data);        
    }

    useEffect(()=>{
        const token = getCurrentToken()
        if(!token) navigate('/login')

        loadDetalleHoras();
    }, [])
    return (
        <div className='row'>
            {
                detalleHora.map((docente)=>{
                    return <DetalleItems detalleHora={docente} key={docente._id} loadDetalleHoras={loadDetalleHoras}/>
                })
            }
        </div>
  )
}

export default DetalleHoraList