// const http = require('http')
const express = require('express'); 
const fs = require("fs");
const { request } = require('http');
const { title } = require('process');
const FILE_PATH = "./db.json";
const mainfile = require('./function')

const PORT = process.env.PORT || 5000;

const app = express()
app.use(express.json())

//******************************** Add ******************
app.post('/todo', (req, res) =>{
    mainfile.add(req.body)
    res.send(`record add done`)
})
//******************************** edit ******************
app.put('/todo/:id', (req, res) =>{
   // console.log(req.body);
    const todo_edit = {
        ... req.body,
        id:req.params.id
    }
    mainfile.eidt(todo_edit)
    res.send(`edit done`)
});
//******************************** list ******************
app.get('/todo', (req, res) =>{
    mainfile.list()
    res.send('get all data')
})

//******************************** delete ******************
app.delete('/todo/:id', (req, res) =>{

    const todo_delete = {
        ... req.body,
        id:req.params.id
    }
    mainfile.remove(todo_delete)
    res.send(`delete done`)
});

//******************************** checked ******************
app.put('/todo/:id/:type', (req, res) =>{

      if(req.params.type == "checked")
      {
        const todo_check = {
            ... req.body,
            id:req.params.id
        }
        mainfile.check(todo_check)
        res.send(` checked done`)
      }
      else
      {
        const todo_check = {
            ... req.body,
            id:req.params.id
        }
        mainfile.uncheck(todo_check)
        res.send(` unchecked done`)
      }
    
 });




app.listen(PORT, (err)=>{
    if(!err) return console.log(`listen port: ${PORT}`);
    console.log(err)
})