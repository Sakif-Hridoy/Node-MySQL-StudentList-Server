import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

app.get('/',(req,res)=>{
    const sql = "SELECT * FROM students";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message:"Error inside database server"})
            return res.json(result)
    })
})

app.post('/student',async(req,res)=>{
    const sql = "INSERT INTO students (`Name`,`Email`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql,[values],(err,result)=>{
        if(err) return res.json(err)
        return res.json(result)
    })
})


app.get('/read/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `SELECT * FROM students WHERE id = ${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message:"Error inside database server"})
            return res.json(result)
    })
})

app.put('/update/:id', (req, res) => {
    const sql = 'UPDATE students SET Name = ?, Email = ? WHERE ID = ?';
    const id = req.params.id;
    
    console.log("Updating ID:", id);
    console.log("Request Body:", req.body);

    db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
        if (err) {
            console.error("Database Update Error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }
        return res.json({ message: "Update successful", result });
    });
});


app.delete('/delete/:id',(req,res)=>{
    const sql = "DELETE FROM students WHERE id=?";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Message:"Error inside database server"});
        return res.json(result)
    })
})




// app.get("/",async(req,res)=>{
//     console.log("Hello Express")
//     res.send("Hello Express")
// })
app.listen(5000,()=>{
    console.log("Listening")
})