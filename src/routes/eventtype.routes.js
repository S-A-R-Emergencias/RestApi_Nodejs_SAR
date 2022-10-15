import {Router} from 'express';

import {getEventTypes,postEventType,putEventType,deleteEventType,getEventType} from '../controllers/eventtype.controllers.js'

const router = Router();

router.get('/eventtype',getEventTypes)
router.get('/eventtype/:id',getEventType)
router.post('/eventtype',postEventType)
router.put('/eventtype/:id',putEventType)
router.delete('/eventtype/:id',deleteEventType)

export default router;