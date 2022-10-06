//ASIGNADO A MARCELO CONDORI
import { pool } from "../db.js"

export const getElement = (req,res) => res.send('Obtener elementos')

export const createElement = async (req,res) => {
    const {name,description,price,stock,category} = req.body
    const [rows] = await pool.promise().query("INSERT INTO element(name,serialNumber,amount,description,unitOfMeasurement) VALUES (?,?,?,?,?)",
    [name,serialNumber,amount,description,unitOfMeasurement])
    res.send({rows})
}

export const updateElement = (req,res) => res.send('Obtener elementos')

export const deleteElement = (req,res) => res.send('Obtener elementos')