import {pool} from '../db.js';

export const getEventTypes = async (req,res)=>{
    
    try{
        const [rows] = await pool.promise().query(`SELECT * FROM eventtype WHERE status='1';`);
        res.json(rows);
    }catch(err){
        res.json({error:err})
    }
}
export const getEventType = async (req,res)=>{
    try{
        const [rows] = await pool.promise().query(`SELECT * FROM eventtype WHERE id = ? AND status = '1'`,[req.params.id]);
        if(rows.length <= 0) return res.status(404).json({message:"No se encontro ese id"});
        res.json(rows[0]);
    }catch(err){
        res.json({error:err})
    }
}
export const postEventType =async (req,res)=>{
    const {name,description} = req.body;
    try{
        const [rows] = await pool.promise().query(`INSERT INTO eventtype(name,description,registerDate,lastUpdate) VALUES(?,?,NOW(),NOW());`,[name,description]);
        res.send({rows});
    }catch(err){
        res.json({error:err})
    }
}
export const putEventType =async (req,res)=>{
    const {name,description} = req.body;
    try{
        const [rows] = await pool.promise().query(`UPDATE eventtype SET name= ? , description= ?,lastUpdate=NOW() WHERE id= ?;`,[name,description,req.params.id]);
        res.send({rows});
    }catch(err){
        res.json({error:err})
    }
}
export const deleteEventType =async (req,res)=>{
    try{
        const [result] = await pool.promise().query(`UPDATE eventtype SET status='0' WHERE id = ? ;`,[req.params.id]);
        if(result.affectedRows <= 0) return res.status(404).json({message:"No se encontro ese id"});
        res.send({rows});
    }catch(err){
        res.sendStatus(204);
    }
}