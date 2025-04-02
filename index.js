import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud"
})

app.get('/',(req,res)=>{
    const sql = "SELECT * FROM students";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message:"Error inside database server"})
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