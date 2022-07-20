import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { ILogin } from './ILogin';
import { useNavigate } from 'react-router-dom';
import {logIn} from './AuthServices'
import axios, { AxiosError } from 'axios';
type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const Login = () => {
    const initialState = {
        username: "",
        contrasena: ""
    };

    const  [login, setLogin] = useState<ILogin>(initialState)
    const [message, setMessage] = useState<String>('')
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleInputChange = (e: InputChange) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const handleSubmmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        try {
            const data = await logIn(login)
            localStorage.setItem("user", JSON.stringify(data));
            setLoading(false)
            navigate('/');
            window.location.reload();
        } catch (error) {
            setLoading(false)
            if(axios.isAxiosError(error)){
                if(login.username.length<=0){
                    setMessage(String(error.response?.data.errors[0].msg))
                }else if(login.contrasena.length<=0){
                    setMessage(String(error.response?.data.errors[0].msg))
                }else{
                    console.log(error.response?.data)
                    setMessage(String(error.response?.data.mesagge))
                }
            }
        }
    }


    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card m-5">
                    <div className="card-body">
                        <form onSubmit={handleSubmmit}>
                        <div className="form-group m-3">
                            <label htmlFor="username">Username</label>
                            <input name="username" type="text" className="form-control" onChange={handleInputChange}/>
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="contrasena">Password</label>
                            <input name="contrasena" type="password" className="form-control" onChange={handleInputChange}/>
                        </div>
                        <div className="form-group m-3">
                            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                            </button>
                        </div>
                        {message && (
                            <div className="form-group m-3">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                            </div>
                        )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login