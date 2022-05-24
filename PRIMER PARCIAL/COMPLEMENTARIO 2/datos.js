const usuarios = [
    {
        id: 1,
        usuario: 'BorisLoor',
        nombre: "Boris",
        apellido: "Loor",
        cedula: '1234567890',
        nivel: 'sexto',
        paralelo: 'B',
        contraseña: 'boris123'
    },
    {
        id: 2,
        usuario: 'SadanaBalcazar',
        nombre: "Sadana",
        apellido: "Balcazar",
        cedula: '1234567891',
        nivel: 'primero',
        paralelo: 'A',
        contraseña: 'sadana123'
    },
    {
        id: 3,
        usuario: 'AnndryCedeño',
        nombre: "Anndry",
        apellido: "Cedeño",
        cedula: '1234567892',
        nivel: 'segundo',
        paralelo: 'B',
        contraseña: 'anndry123'
    },
    {
        id: 4,
        usuario: 'LeiverBravo',
        nombre: "Leiver",
        apellido: "Bravo",
        cedula: '1234567893',
        nivel: 'tercero',
        paralelo: 'A',
        contraseña: 'leiver123'
    },
    {
        id: 5,
        usuario: 'RogerBurgos',
        nombre: "Roger",
        apellido: "Burgos",
        cedula: '1234567894',
        nivel: 'cuarto',
        paralelo: 'B',
        contraseña: 'roger123'
    },
    {
        id: 6,
        usuario: 'JoanaNevado',
        nombre: "Joana",
        apellido: "Nevado",
        cedula: '1234567895',
        nivel: 'quinto',
        paralelo: 'A',
        contraseña: 'joana123'
    },
    {
        id: 7,
        usuario: 'SimonMari',
        nombre: "Simon",
        apellido: "Mari",
        cedula: '1234567896',
        nivel: 'septimo',
        paralelo: 'B',
        contraseña: 'simon123'
    },
    {
        id: 8,
        usuario: 'FlorPlazos',
        nombre: "Flor",
        apellido: "Plazos",
        cedula: '1234567897',
        nivel: 'octavo',
        paralelo: 'A',
        contraseña: 'flor123'
    },
    {
        id: 9,
        usuario: 'FelipeReina',
        nombre: "Felipe",
        apellido: "Reina",
        cedula: '1234567898',
        nivel: 'noveno',
        paralelo: 'B',
        contraseña: 'felipe123'
    },
    {
        id: 10,
        usuario: 'KarenCenteno',
        nombre: "Karen",
        apellido: "Centeno",
        cedula: '1234567899',
        nivel: 'decimo',
        paralelo: 'A',
        contraseña: 'karen123'
    },
]

const aula = [
    {
       codigo : '101',
       nombre : 'aula de clases',
       piso : 1
    },
    {
       codigo : '102',
       nombre : 'laboratorio de redes',
       piso : 1
    },
    {
       codigo : '103',
       nombre : 'aula de clases',
       piso : 1
    },
    {
       codigo : '104',
       nombre : 'laboratorio de electronica',
       piso : 1
    },
    {
       codigo : '201',
       nombre : 'laboratorio de sistemas operativos',
       piso : 2
    },
    {
       codigo : '202',
       nombre : 'laboratorio de bases de datos',
       piso : 2
    },
    {
       codigo : '203',
       nombre : 'laboratorio de programacion',
       piso : 2
    },
    {
       codigo : '206',
       nombre : 'aula de clases',
       piso : 2
    },
    {
       codigo : '207',
       nombre : 'aula de clases',
       piso : 2
    },
    {
       codigo : '301',
       nombre : 'aula de clases',
       piso : 3
    }
];


const niveles = [
    {
        id: 1,
        materia: "Aplicaciones Web II",
        nivel: "Sexto",
        idparalelo: 1
    },
    {
        id: 2,
        materia: "Gobierno Tecnología TI",
        nivel: "Sexto",
        idparalelo: 2
    },
    {
        id: 3,
        materia: "Gestion de base de datos",
        nivel: "Quinto",
        idparalelo: 3
    }
]

const paralelos = [
    {
        id: 1,
        paralelo: "A"
    },
    {
        id: 2,
        paralelo: "B"
    },
    {
        id: 3,
        paralelo: "C"
    }

]


module.exports ={ usuarios, aula, niveles, paralelos}