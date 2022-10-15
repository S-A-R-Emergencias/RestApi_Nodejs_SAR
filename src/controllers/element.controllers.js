//ASIGNADO A MARCELO CONDORI
import { pool } from "../db.js"

export const getElements = async (req,res) => {
    const [rows] = await pool.promise().query("SELECT * FROM elements")
    res.send({rows})
}
export const getElementsById= async (req,res) => {
    const [rows] = await pool.promise().query("SELECT * FROM elements WHERE id = ?",[req.params.id])
    if(rows.length > 0)return res.status(400).json({
        ok:false,
    })
    res.json(rows[0])
    
}
export const createElement = async (req,res) => {
    const {name,serialNumber,amount,description,unitOfMeasurement,User,idElementType} = req.body
    const [rows] = await pool.promise().query("INSERT INTO elements (name,serialNumber,amount,description,unitOfMeasurement,User,idElementType) VALUES (?,?,?,?,?,?,?)",
    [name,serialNumber,amount,description,unitOfMeasurement,User,idElementType])
    if(rows.affectedRows > 0)return res.status(400).json({
        ok:false,
    })
    res.json({ok:true})
    res.send({rows})
}

export const updateElement = async (req,res) => {
    const {name,serialNumber,amount,description,unitOfMeasurement,User,idElementType} = req.body
    const {id} = req.params
    const [rows] = await pool.promise().query("UPDATE elements SET name = ?,serialNumber = ?,amount = ?,description = ?,unitOfMeasurement = ?,lastUpdate=CURRENT_TIMESTAMP,User = ?,idElementType = ? WHERE id = ?",
    [name,serialNumber,amount,description,unitOfMeasurement,User,idElementType,id])
    if(rows.affectedRows > 0)return res.status(400).json({
        ok:false,
    })
    res.send({rows})
}

export const deleteElement = async (req,res) => {
    const {id} = req.params
    const[rows]= await pool.promise().query("UPDATE elements SET status = 0, lastUpdate = CURRENT_TIMESTAMP WHERE id = ?",[id])
    if(rows.affectedRows > 0)return res.status(400).json({
        ok:false,
    })
    res.send({rows})
}
