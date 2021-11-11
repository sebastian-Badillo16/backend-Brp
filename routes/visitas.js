import { Router } from 'express';
import VisitasControllers from '../controllers/visitas.js'
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validas-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import validarRoles from '../middlewares/validar-rol.js';
import validarExistaArchivo from '../middlewares/validarExisteArchivo.js';


const router = Router();

router.post('/upload/:id', [
    validarJWT,
    validarRoles('REGISTRADOR_ROL', 'ADMIN_ROL'),
    validarExistaArchivo,
    validarCampos
], VisitasControllers.cargarArchivos),

router.post('/uploadcloud/:id', [
        validarJWT,
        validarRoles('REGISTRADOR_ROL', 'ADMIN_ROL'),
        validarExistaArchivo,
        validarCampos
], VisitasControllers.cargarArchivoscloud),

router.get('/uploadcloud/:id', [
        validarJWT,
        validarRoles('REGISTRADOR_ROL', 'ADMIN_ROL'),
        check('id', 'No es un ID valido').isMongoId(),
        
        validarCampos
], VisitasControllers.mostarImagenCloud);

router.get('/upload/:id', [
    validarJWT,
    validarRoles('REGISTRADOR_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    validarExistaArchivo,
    validarCampos
], VisitasControllers.mostarImagenGet);

router.get('/', [
    validarJWT,
    validarRoles('REGISTRADOR_ROL', 'ADMIN_ROL'),
    validarCampos
], VisitasControllers.visitasGet);

router.post('/', [
    validarJWT,
    validarRoles('REGISTRADOR_ROL', 'ADMIN_ROL'),
    // check('Nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('Codigo','El Codigo es obligatorio').not().isEmpty(),
    validarCampos
], VisitasControllers.visitasPost);  

router.delete('/:id', [
    validarJWT,
    validarRoles('ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    // check ('id').custom(existeRegistroBiID), 
    validarCampos
], VisitasControllers.visitasDelete);

export default router;