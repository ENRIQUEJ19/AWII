const joi = require('joi'); 

const sugerencias = {
    nombre : 'Por favor ingrese su nombre, que no sobrepase el límite de 10 dígitos y que se encuentre dentro del mínimo de 4 dígitos',
    apellido : 'Por favor ingrese su apellido, este tiene que ser entre 4 a 20 dígitos',
    ci : 'Por favor ingrese su número de identificación, este tiene que ser de 10 digitos y tipo numerico', 
    username: 'Su nombre de usuario debe ser mayor a 4 caracteres',
    email : 'Ingrese un correo valido',
    pass : 'Su contraseña debe tener minimo 8 caracteres',
    telefono: 'El numero de telefono debe tener 10 digitos',
    nivel: 'Ingrese su nivel necesariamente tiene que ser de tipo numerico',
    paralelo: 'El paralelo debe tener maximo un caracter'
}
const datosUsuario = [
    {
        type:'input',
        name: 'nombre',
        mesage: 'Ingrese su nombre: ',
        
        validate : (nombre) =>{
            const {error} =joi.string()
            .min(4)
            .max(10)
            .required()
            .messages({"string.max": sugerencias.nombre})
            .validate(nombre);
        return error ? sugerencias.nombre : true;
        },
    },
    {
        type: 'input',
        name: 'apellido',
        message: 'Ingrese su apellido:',
    
        validate :(apellido) =>{
            const {error} = joi.string()
            .min(4)
            .max(20)
            .required()
            .messages({"string.max": sugerencias.apellido})
            .validate(apellido);
        return error ? sugerencias.apellido : true;
        },
    },
    {
        type: 'input',
        name: 'cedula',
        message:'Ingrese su número de cédula: ',
        validate : (ci) =>  {
            const { error } =joi.string()
            .min(10)
            .max(10)
            .required()
            .messages({"string.min": sugerencias.ci})
            .validate(ci);
            return error ? sugerencias.ci :true;
        }
    },
    {
        type: 'input',
        name: 'nivel',
        message:'Ingrese su nivel: ',
        validate : (nivel) =>  {
            const { error } = joi.number()
            .max(10)
            .messages({"string.max": sugerencias.nivel})
            .validate(nivel);
            return error ? sugerencias.nivel :true;
        }
    },
    {
        type: 'input',
        name: 'paralelo',
        message:'Ingrese paralelo: ',
        validate : (paralelo) =>  {
            const { error } =joi.string()
            .max(1)
            .messages({"string.max": sugerencias.paralelo})
            .validate(paralelo);
            return error ? sugerencias.paralelo :true;
        }
    },
]
const usuario = [
{
    type:'input',
    name: 'username',
    mesage: 'Ingrese su nombre de usuario: ',
    
    validate : (username) =>{
        const {error} =joi.string()
        .min(4)
        .required()
        .messages({"string.max": sugerencias.username})
        .validate(username);
    return error ? sugerencias.username : true;
    },
},
{
    type:'input',
    name: 'email',
    message: 'Ingrese su email',

    validate:  (email) =>{
        const {error} = joi.string()
        .required()
        .messages({"string.alphanum": sugerencias.email})
        .validate(email);
    return error ? sugerencias.email : true;
    },
}, 
{
    type: "input",
    message: "Ingrese número de Teléfono",
    name: "telefono",
    validate: telefono => {
        const {
            error
        } = joi.string().min(10).max(10)
            .messages({
                'string.max': sugerencias.telefono
            })
            .validate(telefono);
        return error ? sugerencias.telefono : true;
    }
},
{
    type: 'password',       
    name: 'contrasena',
    message: 'Ingrese su contraseña',
    validate : (contrasena) =>{
        const {error} =joi.string()
        .alphanum()
        .min(8)
        .messages({"string.max": sugerencias.pass})
        .validate(contrasena);
    return error ? sugerencias.pass : true;
    }
},

];


const listarUsuario = data => {
    const arr = [];
    data.Usuarios.forEach(element => {
        arr.push({
            value: element._id,
            name: element.username
        })
    });
    return ([{
        type: 'list',
        name: 'usuario',
        message: 'Escoja un usuario',
        choices: arr
    }])
}

const actualizar = [{
    type: 'list',
    name: 'actualizar',
    message: 'Escoja que desea editar',
    choices: [{
            value: 1,
            name: '1. Editar nombre de usuario'
        },
        {
            value: 2,
            name: '2. Editar email'
        },
        {
            value: 3,
            name: '3. Editar telefono'
        },
        {
            value: 4,
            name: '4. Editar nombre'
        },
        {
            value: 5,
            name: '5. Editar apellido'
        },
        {
            value: 6,
            name: '6. Editar cedula'
        },
        {
            value: 7,
            name: '7. Editar nivel'
        },
        {
            value: 8,
            name: '8. Editar paralelo'
        },
        {
            value: 9,
            name: '9. Cancelar'
        },
    ]
}]

module.exports = {
    usuario,
    datosUsuario,
    listarUsuario,
    actualizar
}