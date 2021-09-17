const express = require('express');
const app = express();
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password:'9510',
    database: 'user_details'

});

app.post('/add',(req,res) => {
    console.log(req.body)
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const city = req.body.city
    const state = req.body.state
    const country = req.body.country
    const area = req.body.area

    db.query('INSERT INTO userdetails (name,email,phone,city,state,country,area) VALUES (?,?,?,?,?,?,?)',
    [name,email,phone,city,state,country,area], 
    (err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send("value inserted")
        }
    })
})

app.get('/users',(req,res) => {
    console.log("recieved get request for users");
    db.query("SELECT * FROM userdetails", 
    (err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.put('/update',(req,res) => {
    console.log("recieved update request for users");
    var id = req.body.id
    var email =  req.body.email
    
    db.query("UPDATE userdetails SET email = ? WHERE id = ?",
    [email,id],
    (err,result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result)
        }
    }
    
    )
})

app.delete('/delete/:id',(req,res) => {
    const id= req.params.id
    db.query("DELETE FROM userdetails WHERE id = ?" ,id,
    (err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.listen(3001, () => {
    console.log("server is running on 3001")
})