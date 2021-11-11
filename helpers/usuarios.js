import Usuario from "../models/usuario.js"

const existeUsuarioByID = async (id)=>{
    const existe = await Usuario.findById(id)

    if (!existe){
        throw new Error (`El ID no existe`)
    }
} 

export default existeUsuarioByID;