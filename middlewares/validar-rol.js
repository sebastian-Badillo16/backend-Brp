const validarRoles = (...roles)=>{
    return (req,res,next)=>{
        if ( ! (roles.includes(req.usuario.Rol)) || req.usuario.Rol === 'ADMIN' ) {
            return res.status(401).json ({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        } 
            next();
    }
}
export default validarRoles;