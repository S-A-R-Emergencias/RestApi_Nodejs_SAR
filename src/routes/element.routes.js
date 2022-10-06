//TAREA ASIGNADA A MARCELO CONDORI
import {Router} from 'express'
import {getElements,getElementsById,createElement,updateElement,deleteElement} from "../controllers/element.controllers.js"

const router = Router()

router.get('/element',getElements)
router.get('/element/:id',getElementsById)

router.post('/element',createElement)

router.put('/element/:id',updateElement)

router.delete('/element/:id',deleteElement)
export default router