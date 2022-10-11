//TAREA ASIGNADA A FERNANDO APARICIO

import {Router} from 'express'

import {getPerson,createPerson,updatePerson,deletePerson, getPersons} from "../controllers/person.controllers.js"

const router = Router()

router.get('/person',getPersons)

router.get('/person/:id',getPerson)

router.post('/person',createPerson)

router.patch('/person/:id',updatePerson)

router.delete('/person/:id',deletePerson)

export default router