import {pool} from '../db.js';

export const getElementTypes = async (req,res)=>{
    try{
        const [rows] = await pool.promise().query(`SELECT * FROM elementtype WHERE status = '1';`);
        res.json(rows);
    }catch(err){
        res.json({error:err})
    }
}
export const getElementType = async (req,res)=>{
    try{
        const [rows] = await pool.promise().query(`SELECT * FROM elementtype WHERE id = ? AND status = '1'`,[req.params.id]);
        if(rows.length <= 0) return res.status(404).json({message:"No se encontro ese id"});
        res.json(rows[0]);
    }catch(err){
        res.json({error:err})
    }
}
export const postElementType =async (req,res)=>{
    const {name,user} = req.body;
    try{
        const [rows] = await pool.promise().query('INSERT INTO elementtype(name,registerDate,lastUpdate,user) VALUES(?,NOW(),NOW(), ?);',[name,user]);
        res.send({rows});
    }catch(err){
        res.json({error:err})
    }
}
export const putElementType =async (req,res)=>{
    const {name} = req.body;
    try{
        const [rows] = await pool.promise().query(`UPDATE elementtype SET name= ? ,lastUpdate=NOW() WHERE id= ? ;`,[name,req.params.id]);
        res.send({rows});
    }catch(err){
        res.json({error:err})
    }
}
export const deleteElementType =async (req,res)=>{
    try{
        const [result] = await pool.promise().query(`UPDATE elementtype SET status='0' WHERE id = ? ;`,[req.params.id]);
        if(result.affectedRows <= 0) return res.status(404).json({message:"No se encontro ese id"});
        res.send({rows});
    }catch(err){
        res.sendStatus(204);
    }
}