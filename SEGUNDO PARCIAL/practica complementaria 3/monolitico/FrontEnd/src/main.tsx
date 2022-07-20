import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import 'bootswatch/dist/litera/bootstrap.min.css';
import 'bootstrap'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import './index.css'
import Navbar from './components/Navbar/Navbar';
import DocentesList from './components/Docentes/DocenteList';
import DocentesForm from './components/Docentes/DocenteForm';
import HorarioForm from './components/Horas/HorarioForm';
import HorarioList from './components/Horas/HorarioList';
import DetalleHoraForm from './components/DetalleHora/DetalleHoraForm';
import AsignaturaList from './components/Asignaturas/AsignaturaList';
import AsignaturaForm from './components/Asignaturas/AsignaturaForm';
import Login from './components/Authentication/Login';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={
          <>
          <Link to={'/new-horario'} className='btn btn-outline-success ms-4 mt-4 blur border-btn'>+ Nuevo Horario</Link>
          <HorarioList/>
          </>}/>
        <Route path='/recursos' element={
        <>
        <Link to={'/new-docente'} className='btn btn-outline-success ms-4 mt-4 border-btn blur'>+ Agregar Docente</Link>
        <Link to={'/new-asignatura'} className='btn btn-outline-success ms-4 mt-4 border-btn blur'>+ Agregar Asignatura</Link>
        <>
          <h2 className='ms-5 mt-4'>Docentes</h2>
          <DocentesList/>
        </>
        <>
          <h2 className='ms-5'>Asignaturas</h2>
          <AsignaturaList/>
        </>
        </>}/>
        
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Login/>}/>
        
        <Route path='/new-docente' element={<DocentesForm/>}/>
        <Route path='/update/:id' element={<DocentesForm/>}/>
        
        <Route path='/new-hora' element={<DetalleHoraForm/>}/>
        <Route path='/updateDetalleHora/:id' element={<DetalleHoraForm/>}/>

        <Route path='/new-horario' element={<HorarioForm/>}/>
        <Route path='/updateHorario/:id' element={<HorarioForm/>}/>

        <Route path='/new-asignatura' element={<AsignaturaForm/>}/>
        <Route path='/updateAsignatura/:id' element={<AsignaturaForm/>}/>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  </React.StrictMode>
)
