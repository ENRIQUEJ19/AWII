import React, { useEffect, useState } from 'react'
import { IDocente } from './IDocente';
import DocenteItems from './DocenteItems';
import * as docenteServices from './DocenteServices';
import { getCurrentToken } from '../Authentication/AuthServices';
import { useNavigate } from 'react-router-dom';

const DocentesList = () => {

    const [docentes, setDocentes] = useState<IDocente[]>([])

    const loadDocentes = async()=>{
        const res = await docenteServices.getDocentes();
        setDocentes(res.data);        
    }
    const navigate = useNavigate();

    useEffect(()=>{
        const token = getCurrentToken()
        if(!token) navigate('/login')
        loadDocentes();
    }, [])
    return (
        <div className='row'>
            {
                docentes.map((docente)=>{
                    return <DocenteItems docente={docente} key={docente._id} loadDocentes={loadDocentes}/>
                })
            }
        </div>
  )
}

export default DocentesList