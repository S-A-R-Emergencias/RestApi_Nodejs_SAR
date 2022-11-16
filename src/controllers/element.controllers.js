//ASIGNADO A MARCELO CONDORI
import { pool } from "../db.js"

export const getElements = async (req,res) => {
    const [rows] = await pool.promise().query("SELECT * FROM elements WHERE status = 1")
    res.send(rows)
}
export const getElementsById= async (req,res) => {
    try{
        const [rows] = await pool.promise().query('SELECT * FROM elements WHERE id = ? AND status = 1',[req.params.id])
        if(rows.length < 0)return res.status(400).json({
            ok:false,
        })
        res.json(rows[0])
    }catch(error){
        return res.status(500).json({message: 'Something goes wrong'})
    }
    
    
}
export const createElement = async (req,res) => {
    try{
        const {name,serialNumber,amount,description,unitOfMeasurement,User,idElementType,image} = req.body
        const [rows] = await pool.promise().query("INSERT INTO elements (name,serialNumber,amount,description,unitOfMeasurement,User,idElementType,image) VALUES (?,?,?,?,?,?,?,?)",
        [name,serialNumber,amount,description,unitOfMeasurement,User,idElementType,image])
        res.send(rows)
    }catch(error){
        console.log(error.description)
        return res.status(500).json({message: 'Something goes wrong'})
    }
    
}

export const updateElement = async (req,res) => {
    const {name,serialNumber,amount,description,unitOfMeasurement,User,idElementType,image} = req.body
    const {id} = req.params
    const [rows] = await pool.promise().query("UPDATE elements SET name = IFNULL(?,name) , serialNumber = IFNULL(?,serialNumber) , amount = IFNULL(?,amount) , description = IFNULL(?,description) , unitOfMeasurement = IFNULL(?,unitOfMeasurement) , User = IFNULL(?,User) , idElementType = IFNULL(?,idElementType), image = IFNULL(?,image), lastUpdate = CURRENT_TIMESTAMP  WHERE id = ?",
    [name,serialNumber,amount,description,unitOfMeasurement,User,idElementType,image,id])
    if(rows.affectedRows <= 0)
    return res.status(400).json({
        ok:false,
    })
    res.send(rows)
}

export const deleteElement = async (req,res) => {
    const {id} = req.params
    const[rows]= await pool.promise().query("UPDATE elements SET status = 0, lastUpdate = CURRENT_TIMESTAMP WHERE id = ?",[id])
    if(rows.affectedRows <= 0)return res.status(400).json({
        ok:false,
    })
    res.send(rows)
}
