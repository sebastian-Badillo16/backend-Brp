
import Dependencias from '../models/dependencias.js'

const existedependenciasByID = async ()=>{
    const existe = await Dependencias.findById(id);

    if (!existe) throw new Error (`El ID no existe`);
}

export default existedependenciasByID;