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



// app.get("/",async(req,res)=>{
//     console.log("Hello Express")
//     res.send("Hello Express")
// })
app.listen(5000,()=>{
    console.log("Listening")
})