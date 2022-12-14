//ASIGNADO A FERNANDO APARICIO

import { pool } from "../db.js"

export const getPersons = async (req,res) => {
    try{
        const [rows] = await pool.promise().query('SELECT * FROM person WHERE status = 1')
        res.json(rows)
    }catch(error){
        return res.status(500).json({message: 'Something goes wrong'})
    }
    
}

export const getPerson = async (req,res) => {

    try{
        const [rows] = await pool.promise().query('SELECT * FROM person WHERE id = ? AND status = 1' ,[req.params.id])
        if(rows.length <= 0 ) return res.status(404).json({
            message: 'Person not found'
        })

        res.json(rows[0])
    }catch(error){
        return res.status(500).json({message: 'Something goes wrong'})
    }
    
}

export const loginPerson = async (req,res) => {

    try{
        const [rows] = await pool.promise().query('SELECT * FROM person WHERE email = ? AND password = MD5(?) AND status = 1' ,[req.params.email,req.params.password])
        if(rows.length <= 0 ) return res.status(404).json({
            message: 'Person not found'
        })
        res.json(rows[0])
    }catch(error){
        return res.status(500).json({message: 'Something goes wrong'})
    }
    
}

export const createPerson = async (req,res) => {
    const {name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role,image} = req.body
    try{
        const [rows] = await pool.promise().query(
            "INSERT INTO person(name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role,image) VALUES (?,?,?,?,?,?,?,?,MD5(?),?,?)",
            [name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role,image])
            
        res.send({rows})
    }catch(error){
        return res.status(500).json({message: 'Something goes wrong'})
    }
    
}

export const updatePerson = async (req,res) => {
    const {id} = req.params
    const {name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role,image} = req.body
    try{
        const [result] = await pool.promise().query(
            'UPDATE person SET name = IFNULL(?,name), lastName = IFNULL(?,lastName), secondLastName = IFNULL(?,secondLastName), ci = IFNULL(?,ci), address = IFNULL(?,address), birthDate = IFNULL(?,birthDate), email = IFNULL(?,email), telephone = IFNULL(?,telephone) , password =  IFNULL(?,password),role = IFNULL(?,role), image = IFNULL(?,image),  lastUpdate = CURRENT_TIMESTAMP  WHERE id = ?' ,
            [name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role,image,id])
            
        if(result.affectedRows <= 0){
            return res.status(404).json({
                message: 'Person not found'
            })
        }
        const [rows] = await pool.promise().query('SELECT * FROM person WHERE id = ?' ,[id])
        res.json(rows[0])
    }catch(error){
        return res.status(500).json({message: 'Something goes wrong'})
    }
    
}

export const updatePassword = async (req,res) => {
    const {id,newpassword} = req.params
    try{
        const [result] = await pool.promise().query(
            'UPDATE person SET password = MD5(?),  lastUpdate = CURRENT_TIMESTAMP  WHERE id = ?' ,
            [newpassword,id])
            
        if(result.affectedRows <= 0){
            return res.status(404).json({
                message: 'Person not found'
            })
        }
        return res.status(200).json({
            message: 'Password Updated'
        })
    }catch(error){
        return res.status(500).json({message: 'Something goes wrong'})
    }
    
}

export const deletePerson = async (req,res) => {
    try{
        const [result] = await pool.promise().query('UPDATE person SET status = 0, lastUpdate = CURRENT_TIMESTAMP  WHERE id = ?' ,[req.params.id])
        if(result.affectedRows <= 0){
            return res.status(404).json({
                message: 'Person not found'
            })
        }
        res.sendStatus(204)
    }catch(error){
        return res.status(500).json({message: 'Something goes wrong'})
    }
    
}