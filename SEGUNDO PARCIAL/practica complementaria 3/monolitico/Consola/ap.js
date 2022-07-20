const inquirer = require ('inquirer');

const {mostrarUsuario, mostrarUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario} = require('./funciones')

const start = () => {
    inquirer.prompt(menu = [{
        type: 'list',
        name: 'menu',
        message: 'Bienvenido al modulo de Usuarios, por favor seleccione una opción',
        loop: true,
        choices: [{
                value: 1,
                name: '1. Mostrar Usuarios'
            },
            {
                value: 2,
                name: '2. Mostrar Usuario'
            },
            {
                value: 3,
                name: '3. Crear Usuario'
            },
            {
                value: 4,
                name: '4. Actualizar Usuario'
            },
            {
                value: 5,
                name: '5. Eliminar Usuario'
            },
            {
                value: 6,
                name: '6. Salir'
            }
        ]
    }])
    .then((answers) => {
        switch (answers.menu) {
            case 1:
                console.log("1.Listar Usuarios");
                mostrarUsuarios(start);
                break;
            case 2:
                console.log("2.Buscar Usuario");
                mostrarUsuario(start)
                break;
            case 3:
                console.log("3.Crear Usuario");
                crearUsuario(start)
                break;
            case 4:
                console.log("4.Actualizar Usuario");
                actualizarUsuario(start)
                break;
            case 5:
                console.log("5.Eliminar Usuario ");
                eliminarUsuario(start)
                break;
            case 6:
                console.log("6.Salir");
                break;
            default: console.log("ERROR");
            break;
        }
    })
}



start()

