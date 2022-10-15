import {Router} from 'express';
import {getElementTypes,getElementType,postElementType,putElementType,deleteElementType} from '../controllers/elementtype.controllers.js'

const router = Router();

router.get('/elementtype',getElementTypes)
router.get('/elementtype/:id',getElementType)
router.post('/elementtype',postElementType)
router.put('/elementtype/:id',putElementType)
router.delete('/elementtype/:id',deleteElementType)

export default router;