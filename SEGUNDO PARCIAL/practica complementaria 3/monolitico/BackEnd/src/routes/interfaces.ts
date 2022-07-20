import { NextFunction, Request, Response, Router } from 'express'
 
const router = Router()

router.get("/", (req:Request, res:Response) => {
    res.render('index', {titulo: `Inicio con HBS`})
});


export {
    router as Interfaces
};