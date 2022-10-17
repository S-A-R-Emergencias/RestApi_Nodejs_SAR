//TAREA ASIGNADA A CHARLY JIMENEZ
import { Router } from 'express'
import {
    getaccidentreport,
    createaccidentreport,
    updateaccidentreport,
    deleteaccidentreport, 
    getaccidentreports, 
} from '../controllers/accidentreport.controllers.js';

const router = Router ()

router.get('/report', getaccidentreport);

router.get('/report/:id', getaccidentreports);


router.post('/report', createaccidentreport);


router.patch('/report/:id', updateaccidentreport);

router.delete('/report/:id', deleteaccidentreport);


export default router;