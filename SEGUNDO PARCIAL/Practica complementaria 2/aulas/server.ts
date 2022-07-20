import express, { Router, Express } from "express";
import cors from 'cors';

import {Aula} from "./src/app";
import { dbConnection } from "./src/config";

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
            aulas: '/aulas'
        }
        this.conectarDB();
        this.middleware();
        this.routes();
        this.router.use('/api', this.app);
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
        this.app.use(this.paths.aulas, Aula);
    }
    
    listen(){
        this._express.listen(this.port, ()=>{
            console.log(`Server running on http://localhost:${this.port}/api/aulas`);
            
        })
    }
}

export { Server }