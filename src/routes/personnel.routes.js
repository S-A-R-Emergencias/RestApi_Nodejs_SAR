//TAREA ASIGNADA A ALAN MONTAÑO

import {Router} from 'express'

import {getPersonnel,createPersonnel,updatePersonnel,deletePersonnel, getPersonnels} from "../controllers/personnel.controllers.js"

const router = Router()

router.get('/personnel',getPersonnels)

router.get('/personnel/:id',getPersonnel)

router.post('/personnel',createPersonnel)

router.patch('/personnel/:id',updatePersonnel)

router.delete('/personnel/:id',deletePersonnel)

export default router