import React, { useEffect, useState } from 'react'
import { IAsignatura } from './IAsignatura';
import AsignaturaItems from './AsignaturaItems';
import * as asignaturaServices from './AsignaturaServices';
import { getCurrentToken } from '../Authentication/AuthServices';
import { useNavigate } from 'react-router-dom';

const AsignaturaList = () => {

    const [asignaturas, setAsignaturas] = useState<IAsignatura[]>([])

    const loadAsignaturas = async()=>{
        const res = await asignaturaServices.getAsignaturas();
        setAsignaturas(res.data);        
    }
    const navigate = useNavigate();

    useEffect(()=>{
        const token = getCurrentToken()
        if(!token) navigate('/login')
        loadAsignaturas();
    }, [])
    return (
        <div className='row'>
            {
                asignaturas.map((asignatura)=>{
                    return <AsignaturaItems asignatura={asignatura} key={asignatura._id} loadAsignaturas={loadAsignaturas}/>
                })
            }
        </div>
  )
}

export default AsignaturaList