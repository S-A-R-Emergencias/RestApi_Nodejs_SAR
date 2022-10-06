//TAREA ASIGNADA A MARCELO CONDORI
import {Router} from 'express'

import {getElement,createElement,updateElement,deleteElement} from "../controllers/element.controllers.js"

const router = Router()
router.get('/element',getElement)
router.post('/element',createElement)
router.put('/element',updateElement)
router.delete('/element',deleteElement)
export default router
