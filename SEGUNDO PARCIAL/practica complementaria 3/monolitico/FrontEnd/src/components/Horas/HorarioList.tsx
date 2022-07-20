import React, { useEffect, useState } from 'react'
import { IHorario } from './IHorario';
import HorarioItems from './HorarioItems';
import * as horarioServices from './HorarioServices';
import { getCurrentToken } from '../Authentication/AuthServices';
import { useNavigate } from 'react-router-dom';

const HorarioList = () => {

    const [horarios, setHorarios] = useState<IHorario[]>([])

    const loadHorarios = async()=>{
        const res = await horarioServices.getHorarios();
        setHorarios(res.data);
    }
    const navigate = useNavigate()
    useEffect(()=>{
        loadHorarios();
        const token = getCurrentToken()
        if(!token) navigate('/login')
    }, [])
    return (
        <div className='row'>
            {
                horarios.map((horario)=>{
                    return <HorarioItems horario={horario} key={horario._id} loadHorarios={loadHorarios}/>
                })
            }
        </div>
  )
}

export default HorarioList