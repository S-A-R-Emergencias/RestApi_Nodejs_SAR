//para iniciar la aplicacion usas el comando en la terminal npm run dev

import express from 'express' 
import indexRoutes from './routes/index.routes.js'
import personRoutes from './routes/person.routes.js' // aqui agregas el import del archivo de rutas

const app = express()

//settings
app.use(express.json())
app.set('port',process.env.PORT || 3000)
app.set('json spaces',2)

app.use(indexRoutes)
app.use(personRoutes) // aqui usas la variable que importaste arriba con tus rutas

//starting the server
app.listen(3000, () => { 
    console.log(`Server on port ${app.get('port')}`)
})