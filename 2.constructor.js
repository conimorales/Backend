import ManagerUsuarios from "./ManagerUsuarios.js"

const manager = new ManagerUsuarios();

const env = async() =>{
    let primeraConsultaUs= await manager.consultarUsuarios();

    let user = {
        nombre: "Mauricio",
        apellido: "Espinoza",
        edad:26,
        curso: "Backend"
    }

    let result = await manage.crearUsuario(user);
    console.log(result)
    let segundaConsultaUs = await manager.consultarUsuarios()
    console.log(segundaConsultaUs)
}

env();