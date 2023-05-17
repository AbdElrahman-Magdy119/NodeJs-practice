const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const usermodel = require('../models/user')

router.post('/',(req,res)=>{
    const userbody = {
        ... req.body
    }
       const userdd = new usermodel(userbody)
        console.log(userdd.getname())
        usermodel.create(userbody,(err,createduser)=>{
        if(!err) return res.json(createduser)
        res.status(500).send(err)
     })
})
router.get('/',(req,res)=>{

    // usermodel.findbyname("asd11654545 asd1vdsv",(err,users)=> {
    //     if(!err) return res.send(users)
    //     res.status(500).send(err)
    // })


    usermodel.find({}, (err,users) =>{
          if(!err){
            return res.send(users)
           
          }
          res.status(500).send(err)
    })
})
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    usermodel.findbyidd(id,(err,users)=> {
        if(!err) return res.send(users)
        res.status(500).send(err)
    })

    // usermodel.find({_id:id}, (err,user) =>{
    //       if(!err){
    //         return res.send(user)
    //       }
    //       res.status(500).send(err)
    // })
})
router.patch('/:id',(req, res) => {
    const id = req.params.id
    const updates = req.body
    usermodel.findByIdAndUpdate(id,updates,(err,user)=>{
            if(!err) return res.json(user)
            res.status(500).send(err)
        })
})

router.delete('/:id',(req,res) => {
    const id = req.params.id
    usermodel.findByIdAndDelete({_id:id},(err,user)=>{
        if(!err) return res.json(user)
        res.status(500).send(err)
    })
})






module.exports = router