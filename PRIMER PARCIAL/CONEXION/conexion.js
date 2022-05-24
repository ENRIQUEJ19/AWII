const mongoose = require('mongoose');
const conexion = "mongodb+srv://bloor:oL7lGFQsrmQaAO2P@dbpersonal.x6zeq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

(async () => {
const conectado = await mongoose.connect(conexion);
const Grupo = mongoose.model('Grupo', {nombre: String})
const grupo1 = new Grupo({nombre: 'Administradores'})

const Permiso = mongoose.model('Permiso', {nombre: String})
const permiso1 = new Permiso({nombre: 'Guardar'})
const permiso2 = new Permiso({nombre: 'Eliminar'})

const Usuario = mongoose.model('Usuario', {
    nombre: String,
    idgrupo: {type: mongoose.Schema.Types.ObjectId, ref: "Grupo"},
    permisos: [
        {
            permiso: {type: mongoose.Schema.Types.ObjectId, ref: "Permiso"},
            estado: {type: Boolean}
        }
    ]
});

const grupoAlmacenado = await grupo1.save();
const permiso1Almacenado = await permiso1.save();
const permiso2Almacenado = await permiso2.save();


const usuario1 = new Usuario({
    nombre: "Administrador",
    idgrupo: grupoAlmacenado._id,
    permisos: [
        {permiso: permiso1._id, estado:true},
        {permiso: permiso2._id, estado:true}
    ]
});

const usuarioAlmacenado = await usuario1.save();
console.log(usuarioAlmacenado, grupoAlmacenado)
})();
