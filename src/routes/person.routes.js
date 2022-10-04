//TAREA ASIGNADA A FERNANDO APARICIO

import {Router} from 'express'

import {getPerson,createPerson,updatePerson,deletePerson} from "../controllers/person.controllers.js"

const router = Router()

router.get('/person',getPerson)

router.post('/person',createPerson)

router.put('/person',updatePerson)

router.delete('/person',deletePerson)

export default router