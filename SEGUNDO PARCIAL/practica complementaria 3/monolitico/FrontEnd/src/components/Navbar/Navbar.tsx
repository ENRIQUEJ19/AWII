import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { logOut, getCurrentToken } from '../Authentication/AuthServices'

const Navbar = () => {
    const logout = async () => {
        const data = await logOut()
        if (data.status) {
            setAuth(false)
        }
        window.location.reload();
    }
    const [auth, setAuth] = useState<Boolean>()

    useEffect(() => {
        const token = getCurrentToken()
        if (!token) {
            setAuth(false)
        } else {
            setAuth(true)
        }
    }, [])
    const navAuht = (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Horarios</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home
                                <span className="visually-hidden">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/recursos">Recursos</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                    </ul>
                    <div className="nav-item dropdown">
                        <a className="dropdown-toggle show blur btn btn-user" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">Usuario</a>
                        <div className="dropdown-menu" data-bs-popper="none">
                            <a className="dropdown-item" href="#">Perfil</a>
                            <div className="dropdown-divider" />
                            <form>
                                <button className="badge bg-info my-2 my-sm-0 m-3" type='button' onClick={logout}>
                                    Salir
                                    {/* Agregar icono salida */}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
    const nav = (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Horarios</Link>
                <form className="d-flex">
                    <Link to='/register'><button className="btn btn-secondary my-2 my-sm-0" type="submit">Sign Up</button></Link>
                    <Link to='/login'><button className="btn btn-success my-2 my-sm-0 m-3" type="submit">Sign In</button></Link>
                </form>
            </div>
        </nav>
    )
    return (
        <div>
            {auth ? navAuht : nav}
        </div>
    )
}

export default Navbar