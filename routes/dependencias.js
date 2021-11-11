import {Router} from 'express';
import DependenciasControllers from '../controllers/dependencias.js';
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validas-campos.js';
import existedependenciasByID from '../helpers/dependencias.js'
import { validarJWT } from '../middlewares/validar-jwt.js';
import validarRoles from '../middlewares/validar-rol.js';

const router = Router();

router.get('/',[
    validarJWT,
    validarRoles('REGISTRADOR_ROL', 'ADMIN_ROL'),
    validarCampos
],DependenciasControllers.dependenciasGet);


router.post('/',[      
    validarJWT,
    validarRoles('REGISTRADOR_ROL', 'ADMIN_ROL'),
     

    validarCampos
],DependenciasControllers.dependenciasPost);

router.put('/:id',[
    validarJWT,
    validarRoles('ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existedependenciasByID), 
    validarCampos
],DependenciasControllers.dependenciasPut);

router.put('/activar/:id',[
    validarJWT,
    validarRoles('REGISTRADOR_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existedependenciasByID),
    validarCampos
],DependenciasControllers.dependenciasPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    validarRoles('REGISTRADOR_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existedependenciasByID),
    validarCampos
],DependenciasControllers.dependenciasPutDesactivar);

router.delete('/:id',[
    validarJWT,
    validarRoles('ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existedependenciasByID),
    validarCampos
],DependenciasControllers.dependenciasDelete);

export default router;