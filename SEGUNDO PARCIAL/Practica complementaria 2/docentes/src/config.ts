import { connect } from 'mongoose';

const dbConnection = async () => {
    try {
        await connect(String(process.env['db']))
        console.log(`Base de datos de Docentes ejecutándose sin problema`)
    } catch (error) {
        console.log(error)
        throw new Error(`Base de datos no disponible`)
    }
}

export {
    dbConnection
}