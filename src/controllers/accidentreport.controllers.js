//ASIGNADO A CHARLY JIMENEZ
import {pool} from '..db.js';

export const getaccidentreport = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM accidentreport");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };

  export const getaccidentreports = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("SELECT * FROM accidentreport WHERE id = ?", [
        id,
      ]);
  
      if (rows.length <= 0) {
        return res.status(404).json({ message: "Reports not found" });
      }
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  
  export const deleteaccidentreport = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("UPDATE accidentreport SET status = 0, lastUpdate = CURRENT_TIMESTAMP WHERE id = ?", [id]);
  
      if (rows.affectedRows <= 0) {
        return res.status(404).json({ message: "Report not found" });
      }
  
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  
  export const createaccidentreport = async (req, res) => {
    try {
      const { idEventType,idUser,description,longitude,latitude,requestDate} = req.body;
      const [rows] = await pool.query(
        "INSERT INTO accidentreport (idEventType,idUser,description,longitude,latitude,requestDate) VALUES (?, ?,?,?,?,?)",
        [idEventType,idUser,description,longitude,latitude,requestDate]
      );
      res.status(201).json({ id: rows.insertId, namereporte});
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  
  export const updateaccidentreport = async (req, res) => {
    try {
      const { id } = req.params;
      const {  idEventType,idUser,description,longitude,latitude,requestDate } = req.body;
  
      const [result] = await pool.query(
        "UPDATE accidentreport SET idEventType=IFNULL(?,idEventType),idUser=IFNULL(?,idUser),description=IFNULL(?,description),longitude=IFNULL(?,longitude),latitude=IFNULL(?,lalitude),requestDate=IFNULL(?,requestDate),lastUpdate = CURRENT_TIMESTAMP WHERE id = ?",
        [idEventType,idUser,description,longitude,latitude,requestDate]
      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Report not found" });
  
      const [rows] = await pool.query("SELECT * FROM accidentreport WHERE id = ?", [
        id,
      ]);
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  