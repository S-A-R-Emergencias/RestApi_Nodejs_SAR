//ASIGNADO A ALAN MONTAÑO

import { pool } from "../db.js"

export const getPersonnels = async (req,res) => {
    try{
        const [rows] = await pool.promise().query('SELECT PL.id, P.name, P.lastName, P.secondLastName, P.ci, P.address, P.birthDate, P.email, P.telephone, P.registerDate, PL.lastUpdate, P.password, P.role, PL.grade, PL.bloodType, PL.allergies FROM person P INNER JOIN personnel PL ON P.id=PL.id')
        res.json(rows)
    }catch(error){
        return res.status(500).json({message: 'Something goes wrong' + error})
    }
    
}

export const getPersonnel = async (req,res) => {

    try{
        const [rows] = await pool.promise().query('SELECT PL.id, P.name, P.lastName, P.secondLastName, P.ci, P.address, P.birthDate, P.email, P.telephone, P.registerDate, PL.lastUpdate, P.password, P.role, PL.grade, PL.bloodType, PL.allergies  FROM person P INNER JOIN personnel PL ON P.id=PL.id WHERE PL.id = ? AND PL.status = 1' ,[req.params.id])
        if(rows.length <= 0 ) return res.status(404).json({
            message: 'Person not found'
        })

        res.json(rows[0])
    }catch(error){
        return res.status(500).json({message: 'Something goes wrong'})
    }
    
}

export const createPersonnel = async (req,res) => {
    const {name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role,grade,bloodType,allergies} = req.body
    try{
        await pool.promise().query('START TRANSACTION')
        const [rows] = await pool.promise().query(
            "INSERT INTO person(name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role) VALUES (?,?,?,?,?,?,?,?,?,?)",
            [name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role])
            await pool.promise().query(
                "INSERT INTO personnel(id,grade,bloodType,allergies) VALUES ((SELECT MAX(id) FROM person),?,?,?)",
                [grade,bloodType,allergies])
        await pool.promise().query('COMMIT')
        res.send({rows})
    }catch(error){
        await pool.promise().query('ROLLBACK')
        return res.status(500).json({message: 'Something goes wrong' + error})
    }
    
}

export const updatePersonnel = async (req,res) => {
    const {id} = req.params
    const {name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role,grade,bloodType,allergies} = req.body

    try{
        await pool.promise().query('START TRANSACTION')
        const [result] = await pool.promise().query(
            'UPDATE person SET name = IFNULL(?,name), lastName = IFNULL(?,lastName), secondLastName = IFNULL(?,secondLastName), ci = IFNULL(?,ci), address = IFNULL(?,address), birthDate = IFNULL(?,birthDate), email = IFNULL(?,email), telephone = IFNULL(?,telephone) , password =  IFNULL(?,password),role = IFNULL(?,role),  lastUpdate = CURRENT_TIMESTAMP  WHERE id = ?' ,
            [name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role,id])
            await pool.promise().query(
                'UPDATE personnel SET grade = IFNULL(?,grade), bloodType = IFNULL(?,bloodType), allergies = IFNULL(?,allergies),  lastUpdate = CURRENT_TIMESTAMP  WHERE id = ?' ,
                [grade,bloodType,allergies,id])
        await pool.promise().query('COMMIT')
        if(result.affectedRows <= 0){
            return res.status(404).json({
                message: 'Person not found'
            })
        }
        const [rows] = await pool.promise().query('SELECT PL.id, P.name, P.lastName, P.secondLastName, P.ci, P.address, P.birthDate, P.email, P.telephone, P.registerDate, P.password, P.role, PL.grade, PL.bloodType, PL.allergies FROM person P INNER JOIN personnel PL ON P.id=PL.id WHERE PL.id = ? AND PL.status = 1' ,[id])
        res.json(rows[0])
    }catch(error){
        await pool.promise().query('ROLLBACK')
        return res.status(500).json({message: 'Something goes wrong ' + error})
    }
    
}

export const deletePersonnel = async (req,res) => {
    const {id} = req.params
    try{
        await pool.promise().query('START TRANSACTION')
        const [result] = await pool.promise().query(
            'UPDATE person SET status = 0, lastUpdate = CURRENT_TIMESTAMP  WHERE id = ?' 
            ,[id])
        await pool.promise().query(
            'UPDATE personnel SET status = 0, lastUpdate = CURRENT_TIMESTAMP  WHERE id = ?' 
            ,[id])
        if(result.affectedRows <= 0){
            return res.status(404).json({
                message: 'Person not found'
            })
        }
        await pool.promise().query('COMMIT')
        res.sendStatus(204)
    }catch(error){
        await pool.promise().query('ROLLBACK')
        return res.status(500).json({message: 'Something goes wrong ' + error})
    }
    
}