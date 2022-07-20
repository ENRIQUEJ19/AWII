import express, { Router, Express } from "express";
import cors from 'cors';

import * as routes from "./routes";
const { DetalleHora, Registro, Docentes, Asignatura, Aula } = routes;
import { dbConnection } from "./database/config";

class Server {
    app: Router;
    router: Router;
    port: Number;
    paths: { [key: string]:string }
    private _express: Express;
    constructor(){
        this.app = Router();
        this.router = Router();
        this.port = Number(process.env["PORT"]) | 8000;
        this.paths = {
            detalleHora: '/api/detalleHora',
            registro: '/api/registro',
            docentes: '/api/docentes',
            asignaturas: '/api/asignaturas',
            aulas: '/api/aulas'
        }
        this.conectarDB();
        this.middleware();
        this.routes();
        this.router.use('/', this.app);
        this._express = express().use(this.router);
    }
    private async conectarDB(){
        await dbConnection();
    }
    private middleware(){
        this.app.use(cors());
        this.app.use(express.json());
    }
    private routes(){
        this.app.use(this.paths.detalleHora, DetalleHora);
        this.app.use(this.paths.registro, Registro);
        this.app.use(this.paths.docentes, Docentes);
        this.app.use(this.paths.asignaturas, Asignatura);
        this.app.use(this.paths.aulas, Aula);
    }
    
    listen(){
        this._express.listen(this.port, ()=>{
            console.log(`Server running on http://localhost:${this.port}/`);
        })
    }
}

export { Server }