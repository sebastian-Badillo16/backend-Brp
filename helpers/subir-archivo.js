import { v4 as uuidv4 } from 'uuid';
import path from 'path'
import url from 'url'

const subirArchivo = (files, extencionesValidas = ['png', 'jpg', 'gif', 'jpeg']) => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;
        console.log(archivo);
        const nombreCortado = archivo.name.split('.');
        const extencion = nombreCortado[nombreCortado.length - 1];

        // if (extencion=='png'|| extencion=='jpg');
        if (!extencionesValidas.includes(extencion)) {
            return reject('la extencion ',{$extencion} ,'no es permitida,solo,',[$extencion])
        }

        const nombreTemp = uuidv4() + "." + extencion;
        const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
        const uploadPath=path.join(__dirname,'../uploads',nombreTemp);


        archivo.mv(uploadPath,(error)=>{
            if(error){
                return reject(error )
            }
            return resolve(nombreTemp);
        })
    })
}

export default subirArchivo