import Dependencias from '../models/dependencias.js'

const DependenciasControllers = {
    dependenciasGet: async (req, res) => {
        const value = req.query.value;
        const dependencias = await Dependencias
            .find({
                $or: [
                    { Nombre: new RegExp(value, 'i') },
                    { Codigo: new RegExp(value, 'i') },
                    { Descripcion: new RegExp(value, 'i') },


                ]

            })
            .sort({ 'Codigo': -1 })

        res.json({
            dependencias
        })
    },

    dependenciasPost: async (req, res) => {
        const { Nombre,Codigo,Descripcion } = req.body;
        const dependencias = new Dependencias({ Nombre, Codigo, Descripcion })

        await dependencias.save();

        res.json({
            dependencias
        })
    },

    dependenciasPut: async (req, res) => {
        const { id } = req.params
        const { _id,createAt, __v, ...resto } = req.body;

        const dependencias = await Dependencias.findByIdAndUpdate(id, resto);

        res.json({
            dependencias
        })
    },

    dependenciasPutActivar: async (req, res) => {
        const { id } = req.params
        const dependencias = await Dependencias.findByIdAndUpdate(id, { Estado: 1 });

        res.json({
            dependencias
        })
    },

    dependenciasPutDesactivar: async (req, res) => {
        const { id } = req.params
        const dependencias = await Dependencias.findByIdAndUpdate(id, { Estado: 0 });

        res.json({
            dependencias
        })
    },


    dependenciasDelete: async (req, res) => {
        const { id } = req.params
        const dependencias = await Dependencias.findByIdAndDelete(id);
        console.log(id)

        res.json({
            dependencias
        })
    }

}

export default DependenciasControllers;