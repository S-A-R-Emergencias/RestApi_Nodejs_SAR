//TAREA ASIGNADA A ALAN MONTAÑO

import {Router} from 'express'

import {getPersonnel,createPersonnel,loginPersonnel,updatePersonnel,deletePersonnel, getPersonnels, hostImage} from "../controllers/personnel.controllers.js"

const router = Router()

router.get('/personnel',getPersonnels)

router.get('/personnel/:id',getPersonnel)

router.get('/personnel/login/:email/:password',loginPersonnel)

import pkg from 'multer';

const multer = pkg;

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('invalid image file!', false);
  }
};


const uploads = multer({ storage, fileFilter });

router.post('/personnel', uploads.single('image'), createPersonnel)

router.post('/hostImage/:id/:type', uploads.single("image"), hostImage)

router.put('/personnel/:id', updatePersonnel)

router.delete('/personnel/:id',deletePersonnel)

export default router