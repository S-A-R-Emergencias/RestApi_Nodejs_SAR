//ASIGNADO A ALAN MONTAÑO
import pkg from "../helper/imageUpload.cjs";
const { cloud } = pkg;
import { pool } from "../db.js"

export const getPersonnels = async (req,res) => {
    try{
        const [rows] = await pool.promise().query('SELECT PL.id, P.name, P.lastName, P.secondLastName, P.ci, P.address, P.birthDate, P.email, P.telephone, P.registerDate, PL.lastUpdate, P.password, P.role, P.image, PL.grade, PL.bloodType, PL.allergies FROM person P INNER JOIN personnel PL ON P.id=PL.id')
        res.json(rows)
    }catch(error){
        return res.status(500).json({message: 'Something goes wrong' + error})
    }
    
}

export const getPersonnel = async (req,res) => {

    try{
        const [rows] = await pool.promise().query('SELECT PL.id, P.name, P.lastName, P.secondLastName, P.ci, P.address, P.birthDate, P.email, P.telephone, P.registerDate, PL.lastUpdate, P.password, P.role, P.image, PL.grade, PL.bloodType, PL.allergies  FROM person P INNER JOIN personnel PL ON P.id=PL.id WHERE PL.id = ? AND PL.status = 1' ,[req.params.id])
        if(rows.length <= 0 ) return res.status(404).json({
            message: 'Person not found'
        })

        res.json(rows[0])
    }catch(error){
        return res.status(500).json({message: 'Something goes wrong'})
    }
    
}

export const createPersonnel = async (req,res) => {
    const {name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role,image,grade,bloodType,allergies} = req.body
    try{
        await pool.promise().query('START TRANSACTION')
        const [rows] = await pool.promise().query(
            "INSERT INTO person(name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role,image) VALUES (?,?,?,?,?,?,?,?,MD5(?),?,?)",
            [name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role,image])
            const last_id = await pool.promise().query("SELECT MAX(id) FROM person")
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
    const {name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role,image,grade,bloodType,allergies} = req.body
    console.log(req.body);

    try{
        await pool.promise().query('START TRANSACTION')
        const [result] = await pool.promise().query(
            'UPDATE person SET name = IFNULL(?,name), lastName = IFNULL(?,lastName), secondLastName = IFNULL(?,secondLastName), ci = IFNULL(?,ci), address = IFNULL(?,address), birthDate = IFNULL(?,birthDate), email = IFNULL(?,email), telephone = IFNULL(?,telephone) , password =  IFNULL(?,password),role = IFNULL(?,role), image = IFNULL(?,image),  lastUpdate = CURRENT_TIMESTAMP  WHERE id = ?' ,
            [name,lastName,secondLastName,ci,address,birthDate,email,telephone,password,role,image,id])
            await pool.promise().query(
                'UPDATE personnel SET grade = IFNULL(?,grade), bloodType = IFNULL(?,bloodType), allergies = IFNULL(?,allergies),  lastUpdate = CURRENT_TIMESTAMP  WHERE id = ?' ,
                [grade,bloodType,allergies,id])
        await pool.promise().query('COMMIT')
        if(result.affectedRows <= 0){
            return res.status(404).json({
                message: 'Person not found'
            })
        }
        const [rows] = await pool.promise().query('SELECT PL.id, P.name, P.lastName, P.secondLastName, P.ci, P.address, P.birthDate, P.email, P.telephone, P.registerDate, P.password, P.role, P.image, PL.grade, PL.bloodType, PL.allergies FROM person P INNER JOIN personnel PL ON P.id=PL.id WHERE PL.id = ? AND PL.status = 1' ,[id])
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

 export const hostImage = async (req, res) => {
    try {
        const {image} = req.body;
        const file = "data:image/jpg;base64," + image;
        const result = await cloud.uploader.upload(file , {
        public_id: `${req.params.id}_${req.params.type}`,
        width: 500,
        height: 500,
        crop: 'fill',
      });
      res
        .status(201)
        .json({ success: true, message: 'Your profile has updated!' });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'server error, try after some time' });
      console.log('Error while uploading profile image', error.message);
    }
};

export const loginPersonnel = async (req,res) => {

    try{
        const [rows] = await pool.promise().query('SELECT PL.id, P.name, P.lastName, P.secondLastName, P.ci, P.address, P.birthDate, P.email, P.telephone, P.registerDate, PL.lastUpdate, P.password, P.role, P.image, PL.grade, PL.bloodType, PL.allergies  FROM person P INNER JOIN personnel PL ON P.id=PL.id WHERE P.email = ? AND P.password = MD5(?) AND PL.status = 1' ,[req.params.email,req.params.password])
        if(rows.length <= 0 ) return res.status(404).json({
            message: 'Personnel not found'
        })
        res.json(rows[0])
    }catch(error){
        return res.status(500).json({message: 'Something goes wrong'})
    }
    
}