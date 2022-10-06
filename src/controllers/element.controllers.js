//ASIGNADO A MARCELO CONDORI
import { pool } from "../db.js"

export const getElement = async (req,res) => {
    const [rows] = await pool.promise().query("SELECT * FROM elements")
    res.send({rows})
}
export const createElement = async (req,res) => {
    const {name,description,price,stock,category} = req.body
    const [rows] = await pool.promise().query("INSERT INTO elements(name,serialNumber,amount,description,unitOfMeasurement) VALUES (?,?,?,?,?)",
    [name,serialNumber,amount,description,unitOfMeasurement])
    res.send({rows})
}

export const updateElement = (req,res) => {
    const {name,serialNumber,amount,description,unitOfMeasurement} = req.body
    pool.query("UPDATE elements SET name = ?,serialNumber = ?,amount = ?,description = ?,unitOfMeasurement = ? WHERE id = ?",
    [name,serialNumber,amount,description,unitOfMeasurement,id], (err, result) => {
        if(err) throw err
        res.send(result)
    })
}

export const deleteElement = (req,res) => {
    const {id} = req.body
    pool.query("DELETE FROM elements WHERE id = ?",[id], (err, result) => {
        if(err) throw err
        res.send(result)
    })
}