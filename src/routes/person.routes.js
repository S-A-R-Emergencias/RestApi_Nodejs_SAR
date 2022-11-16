//TAREA ASIGNADA A FERNANDO APARICIO

import {Router} from 'express'

import {getPerson,createPerson,updatePerson,deletePerson, getPersons,loginPerson,updatePassword} from "../controllers/person.controllers.js"

const router = Router()

router.get('/person',getPersons)

router.get('/person/:id',getPerson)

router.post('/person',createPerson)

router.get('/person/login/:email/:password',loginPerson)

router.put('/person/:id',updatePerson)

router.put('/person/:id/:newpassword',updatePassword)

router.delete('/person/:id',deletePerson)

export default router