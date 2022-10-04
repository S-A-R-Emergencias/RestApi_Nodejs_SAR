//ASIGNADO A FERNANDO APARICIO

import { pool } from "../db.js"

export const getPerson = (req,res) => res.send('Obtener personas')

export const createPerson = async (req,res) => {
    const {name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role} = req.body
    const [rows] = await pool.promise().query("INSERT INTO person(name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role) VALUES (?,?,?,?,?,?,?,?,?,?)",
                                                [name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role])
    res.send({rows})
}

export const updatePerson = (req,res) => res.send('Obtener personas')

export const deletePerson = (req,res) => res.send('Obtener personas')