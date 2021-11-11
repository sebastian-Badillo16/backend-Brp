import Usuario from '../models/usuario.js';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../middlewares/validar-jwt.js';

const usuarioControllers = {
    usuarioGet: async (req, res) => {
        const query = req.query.value;
        const usuarios = await Usuario.find({

            $or: [
                { Nombre: new RegExp(query, 'i') },
                { Email: new RegExp(query, 'i') },
                { Rol: new RegExp(query, 'i') }
            ]

        });

        res.json({
            usuarios
        })
    },
    //  correcto

    usuarioGetByid: async (req, res) => {

        const { id } = req.params;
        const usuario = await Usuario.findById(id);

        res.json({
            usuario
        })
    },

    usuarioPost: async (req, res) => {
        const { Nombre, Email, Password, Rol } = req.body;
        const usuario = Usuario({ Nombre, Email, Password, Rol });

        const salt = bcryptjs.genSaltSync();
        usuario.Password = bcryptjs.hashSync(Password, salt);

        usuario.save();

        res.json({
            usuario
        })
    }, /**corecto */

    login: async (req, res) => {
        const { Email, Password } = req.body;

        const usuario = await Usuario.findOne({ Email })
        if (!usuario) {
            return res.status(404).json({
                msg: 'Usuario/Password no encontrado "email"'
            })
        }
        if (usuario.Estado === 0) {
            return res.status(404).json({
                msg: 'Usuario/Password no encontrado "estado"'
            })
        }
        const validarPassword = bcryptjs.compareSync(Password, usuario.Password);
        if (!validarPassword) {
            return res.status(404).json({
                msg: 'Usuario/Password no encontrado "password"'
            })   
        }
             
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    },
    //correcto

    usuarioPut: async (req, res) => {
        const { id } = req.params;
        const { _id, Email, createAt, Estado, __v, Rol, Password, ...resto } = req.body;

        if (Password) {
            const salt = bcryptjs.genSaltSync();
            resto.Password = bcryptjs.hashSync(Password, salt);
        }

        const usuario = await Usuario.findByIdAndUpdate(id, resto);

        res.json({
            usuario
        })
    },
        // correcto
    usuarioPutActivar: async (req, res) => {
        const { id } = req.params;

        const usuario = await Usuario.findByIdAndUpdate(id, { Estado: 1 });

        res.json({
            usuario
        })
    }, 
    // incorrecto 

    usuarioPutDesactivar: async (req, res) => {
        const { id } = req.params;

        const usuario = await Usuario.findByIdAndUpdate(id, { Estado: 0 });

        res.json({
            usuario
        })
    },
    // incorrecto

    usuarioDelete: async (req, res) => {
        const { id } = req.params
        const usuario = await Usuario.findByIdAndDelete(id);
         console.log(id)
        res.json({
            usuario
        })
    }
}

export default usuarioControllers;