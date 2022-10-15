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

export const createPerson = async (req,res) => {
    const {name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role} = req.body
    try{
        const [rows] = await pool.promise().query(
            "INSERT INTO person(name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role) VALUES (?,?,?,?,?,?,?,?,?,?)",
            [name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role])
        res.send({rows})
    }catch(error){
        return res.status(500).json({message: 'Something goes wrong'})
    }
    
}

export const updatePerson = async (req,res) => {
    const {id} = req.params
    const {name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role} = req.body

    try{
        const [result] = await pool.promise().query(
            'UPDATE person SET name = IFNULL(?,name), lastName = IFNULL(?,lastName), secondLastName = IFNULL(?,secondLastName), ci = IFNULL(?,ci), address = IFNULL(?,address), birthDate = IFNULL(?,birthDate), email = IFNULL(?,email), telephone = IFNULL(?,telephone) , password =  IFNULL(?,password),role = IFNULL(?,role),  lastUpdate = CURRENT_TIMESTAMP  WHERE id = ?' ,
            [name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role,id])
            
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