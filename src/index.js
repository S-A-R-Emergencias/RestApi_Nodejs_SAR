//para iniciar la aplicacion usas el comando en la terminal npm run dev

import express from 'express' 
import indexRoutes from './routes/index.routes.js'
import cors from 'cors'
import morgan from 'morgan'
import personRoutes from './routes/person.routes.js'
import personnelRoutes from './routes/personnel.routes.js' // aqui agregas el import del archivo de rutas

import {PORT} from './config.js'
const app = express()

//settings
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.set('port',PORT)
app.set('json spaces',2)

app.use(indexRoutes)
app.use('/api',personRoutes)
app.use('/api',personnelRoutes)// aqui usas la variable que importaste arriba con tus rutas


app.use((req, res,next)=>{
    res.status(404).json({message:'Endpoint not found'})
})
//starting the server
app.listen(3000, () => { 
    console.log(`Server on port ${app.get('port')}`)
})