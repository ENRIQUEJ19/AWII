const url = 'http://localhost:8000/horarios/usuario'
const axios = require('axios')
const inquirer = require ('inquirer');

const {usuario, datosUsuario, listarUsuario, actualizar } = require('./inputs')

const crearUsuario = async(volver) =>{
    const datos = await inquirer.prompt(datosUsuario)
    inquirer.prompt(usuario)
    .then(async answers =>{
        try{
            await axios(url, {
                method: 'post',
                data: {
                    username: answers.username,
                    contrasena: answers.contrasena,
                    email: answers.email,
                    telefono: answers.telefono,
                    datos: datos}
            }).then(res => {
                console.log(`Usuario ${res.data.username} creado con exito`)
                setTimeout(volver, 3000)
            })
        }catch(error){
            console.log(error.message)
        }
    })
}

const mostrarUsuario = async(volver) => {
    const res = await axios(url)
    const answers = await inquirer.prompt(listarUsuario(res.data))
    await axios(url + '/' + answers.usuario).then(user => {
        console.log('nombre: ', user.data.datos.nombre)
        console.log('cedula: ', user.data.datos.cedula)
        console.log('nivel: ', user.data.datos.nivel)
        console.log('paralelo: ', user.data.datos.paralelo)
        console.log('telefono: ', user.data.telefono)
    })

    setTimeout(volver, 3000)
}

const mostrarUsuarios = async (volver) => {
    const res = await axios(url)
    const answers = await inquirer.prompt(listarUsuario(res.data))
    if(answers.usuario){
        volver()
    }
}

const actualizarUsuario = async (volver) => {
    const res = await axios(url)
    const answers = await inquirer.prompt(listarUsuario(res.data))
    const opc = await inquirer.prompt(actualizar)
    let valor;
    switch(opc.actualizar){
        case 1:
            valor = await inquirer.prompt([usuario[0]])
            break;
        case 2:
            valor = await inquirer.prompt([usuario[1]])
            break;
        case 3:
            valor = await inquirer.prompt([usuario[2]])
            break;
        case 4:
            valor = await inquirer.prompt([datosUsuario[0]])
            break;
        case 5:
            valor = await inquirer.prompt([datosUsuario[1]])
            break;
        case 6:
            valor = await inquirer.prompt([datosUsuario[2]])
            break;
        case 7:
            valor = await inquirer.prompt([datosUsuario[3]])
            break;
        case 8:
            valor = await inquirer.prompt([datosUsuario[4]])
            break;
        case 9:
            volver()
            break;
    }
    try{
        if(opc.actualizar<=3){
            await axios(url + '/' + answers.usuario,{
                method: 'put',
                data: valor
            }).then(user=>{
                console.log(`Usuario ${user.data.username} ha sido actualizado con exito`)
            })
        }else{
            await axios(url + '/' + answers.usuario,{
                method: 'put',
                data: {
                    datos: valor
                }
            }).then(user=>{
                console.log(`Usuario ${user.data.username} ha sido actualizado con exito`)
            })
        }
        setTimeout(volver, 3000)
    }catch(error){
        console.log(error.message)
    }
}
const eliminarUsuario = async (volver) => {
    const res = await axios(url)
    const answers = await inquirer.prompt(listarUsuario(res.data))
    try {
        await axios(url + '/' + answers.usuario, {
            method: 'delete'
        }).then(user => {
            console.log(`Usuario ${user.data.username} eliminado exitosamente`)
        })
        setTimeout(volver, 3000)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    crearUsuario,
    mostrarUsuario,
    mostrarUsuarios,
    actualizarUsuario,
    eliminarUsuario
}