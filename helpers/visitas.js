import Visitas from '../models/visitas.js'

const existeVisitasBiID = async ()=>{
    const existe = await Visitas.findById(id);

    if (!existe) throw new Error (`El ID no existe`);
}

export default existeVisitasBiID;   