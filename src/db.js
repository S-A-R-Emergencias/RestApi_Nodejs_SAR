//Aqui va todo de la base de datos

import {createPool} from 'mysql2'

export const pool = createPool({
    host:'containers-us-west-89.railway.app',
    user: 'root',
    password: "sWch0On7KuPlkGx8BPf0",
    database:'railway',
    port: 5449
})