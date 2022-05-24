const mongoose = require('mongoose');
const conexion = "mongodb+srv://bloor:oL7lGFQsrmQaAO2P@dbpersonal.x6zeq.mongodb.net/Horario?retryWrites=true&w=majority";

(async () => {
    const conectar = await mongoose.connect(conexion)
    const Aula = mongoose.model(
        'Aula',
        {
            codigo: String,
            nombre: String,
            piso: Number
        }
    )
    const Docente = mongoose.model(
        'Docente',
        {
            nombre: String,
            apellido: String,
            ci: String
        }
    )
    const Asignatura = mongoose.model(
        'Asignatura',
        {
            nombre: String,
        }
    )
    const Usuario = mongoose.model(
        'Usuario',
        {
            username: String,
            contraseña: String,
            datos: {
                nombre: String,
                apellido: String,
                cedula: String,
                nivel: Number,
                paralelo: String
            },
            email: String,
            telefono: String
        })
    const DetalleHora = moongose.model(
        "DetalleHora",
        {
            hora_inicio: String,
            hora_fin: String,
            estudiante: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Usuario"
            },
            asignatura: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Asignatura"
            },
            docente: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Docente"
            },
            nivel: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Nivel"
            },
            aula: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Aula"
            },
            paralelo: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Paralelo"
            }
        }
    )

})

