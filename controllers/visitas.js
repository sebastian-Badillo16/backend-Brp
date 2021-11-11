import Visitas from '../models/visitas.js'
import subirArchivo from '../helpers/subir-archivo.js'
import * as fs from 'fs'
import path from 'path'
import url from 'url'
import cloudinary from 'cloudinary'
import visitas from '../models/visitas.js'

cloudinary.config(process.env.CLOUDINARY_URL)

const VisitasControllers = {
    visitasPost: async (req, res) => {
        const { Asunto, Nombre, Cedula, Ciudad,CodigoD} = req.body;
        const visitas = new Visitas({ Asunto, Nombre, Cedula, Ciudad,CodigoD})

        await visitas.save();

        res.json({
            visitas   
        })   
    },   

    visitasGet: async (req, res) => {
        const value = req.query.value;
        const visitas = await Visitas
            .find({
                $or: [
                    { Asunto: new RegExp(value, 'i') },
                    { Codigo: new RegExp(value, 'i') },
                    { Nombre: new RegExp(value, 'i') },
                    { Cedula: new RegExp(value, 'i') },
                    { Ciudad: new RegExp(value, 'i') },


                ]

            })
            .sort({ 'Cliente': -1 })

        res.json({
            visitas
        })
    },

    mostarImagenGet: async (req, res) => {
        const { id } = req.params

        try {

            let visitas = await Visitas.findById(id)

            if (visitas.foto) {

                const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
                const PathImage = path.join(__dirname, '../uploads', visitas.foto);

                if (fs.existsSync(PathImage)) {
                    return res.sendFile(pathImage)
                }
            }
            res.status(400).json({
                mgs: 'falta imagen'
            })
        } catch (error) {

            res.status(400).json({ error })
        }
    },

    cargarArchivos: async (req, res) => {
        const { id } = req.params;

        try {
            console.log(id);

            const nombre = await subirArchivo(req.files)
            let visita = await Visitas.findById(id);
            console.log(nombre);
            if (visita.foto) {

                const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
                const PathImage = path.join(__dirname, '../uploads', visita.foto);
                if (fs.existsSync(PathImage)) {
                    console.log('existe archivo');
                    fs.unlinkSync(PathImage)

                }
            }
            visita = await Visitas.findByIdAndUpdate(id, { foto: nombre })
            res.json({ nombre });

        } catch (error) {
            res.status(400).json({ error, 'general': 'Controlador' })

        }
    },

    cargarArchivoscloud: async (req, res) => {
        const { id } = req.params;
        console.log(id)
        try {
            const { tempFilePath } = req.files.archivo
            const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

            let visita = await Visitas.findById(id);
            console.log(visita)

            if (visita.foto) {
                console.log(visita.foto);
                const nombreTemp = visita.foto.split('/')
                
                const nombreArchivo = nombreTemp[nombreTemp.length - 1]
                console.log(nombreArchivo);
                const [public_id] = nombreArchivo.split('.')
                console.log(public_id)
                cloudinary.uploader.destroy(public_id)
 


            }

            visita = await Visitas.findByIdAndUpdate(id, { foto: secure_url })
           
            res.json({ secure_url });

        } catch (error) {
            console.log(error)
            res.status(400).json({ error })
        }
    },

    mostarImagenCloud: async (req, res) => {
        const { id } = req.params;

        try {
            let visita = await Visitas.findById(id);

            if (visita.foto) {
                return res.json({url:visita.foto})
                
            }
            res.status(400).json({msg:"falta imagen"})
        } catch (error) {
            res.status(400).json({ error })
        }

    },

    visitasDelete: async (req, res) => {
        const { id } = req.params
        const visita = await Visitas.findByIdAndDelete(id);
        res.json({
            visita
        })
    }

}
export default VisitasControllers;