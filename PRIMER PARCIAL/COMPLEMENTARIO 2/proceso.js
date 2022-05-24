const {usuarios, aulas, niveles, paralelos} = require('./datos')

// --- asincrono
const buscarUsuario = async (id) => {
    const usuario = usuarios.find(u => u.id = id)
    if(!usuario){
        const error = new Error();
        error.message = `El usuario con id ${id} no ha sido encontrado`;
        throw error
    }
    return usuario
}


// ----- PROMESA ------

function Encontrar_Niveles_Por_ID(id)
{
    return new Promise((resolve, reject)=>{
        const nivel = niveles.find((nivel)=> nivel.id===id);
        if(!nivel)
        {
            const error = new Error();
            error.message="No encontramos el id al que pertenece el nivel";
            reject(error);
        }
        resolve(nivel);
    })
}

