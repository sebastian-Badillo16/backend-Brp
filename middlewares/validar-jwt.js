import jwt from 'jsonwebtoken'
// import existeUsuarioById from '../helpers/usuarios.js';
import Usuario from '../models/usuario.js'

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject)=> {
// console.log(uid);

        const payload = { uid }
        jwt.sign(payload, process.env.SECRETPRIVATEKEY, {
            expiresIn: '2h'
        },(err,token) => {

// console.log(token);
            if (err) {
                reject('No se puede crear el token ')
            } else {
                resolve(token)
            }

        })

    })

};

const validarJWT = async (req, res, next) => {
    const token = req.header('token')
    if (!token) {
        return res.status(401).json({
            mgs: 'no hay token en la peticion'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        const usuario = await Usuario.findById(uid)
        if (!usuario) {
            return res.status(401).json({

                msg: 'Token no valido'
            })
        }

        if (usuario.estado === 0) {
            return res.status(401).json({
                msg: 'Token es no valido'
            })
        }

        req.usuario = usuario

        next()
    } catch (error) {
       
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

async function checkToken(token) {
    let __id = null;

    try {
        const { _id } = await jwt.decode(token)
        __id = _id
    } catch (error) {
        return false;
    }

    const existeUsuario = existeUsuarioById(__id)

}

export { generarJWT, validarJWT }