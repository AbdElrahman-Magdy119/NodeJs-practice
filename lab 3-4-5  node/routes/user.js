const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const usermodel = require('../models/user')

router.post('/',async(req,res)=>{
    const userbody = {
        ... req.body
    }
       // const userdd = new usermodel(userbody)
        //console.log(userdd.getname())
       try
       {
           const adduser = await usermodel.create(userbody)
           return res.json(adduser)
       }
       catch (err)
       {
         res.status(500).send(err)
       }   
     })
router.get('/',async(req,res)=>{

    // usermodel.findbyname("asd11654545 asd1vdsv",(err,users)=> {
    //     if(!err) return res.send(users)
    //     res.status(500).send(err)
    // })
       try
       {
          const getuser = await usermodel.find({})
          return res.send(getuser)
       }
     catch(err)
     {
        res.status(500).send(err)
     }
         
    })

router.get('/:id',async(req,res)=>{
    const id = req.params.id;
    try
    {
        const getoneuser = await  usermodel.find({_id:id})
        return res.send(getoneuser)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
    // usermodel.find({_id:id}, (err,user) =>{
    //       if(!err){
    //         return res.send(user)
    //       }
    //       res.status(500).send(err)
    // })
})

router.patch('/:id',async(req, res) => {
    const id = req.params.id
    const updates = req.body

    try
    {
        const updateuser = await  usermodel.findByIdAndUpdate(id,updates)
        return res.json(updateuser)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
})

router.delete('/:id',async(req,res) => {
    const id = req.params.id
   
     try
     {
        const deleteuser = await usermodel.findByIdAndDelete({_id:id})
        return res.json(deleteuser)
     }
     catch(err)
     {
        res.status(500).send(err)
     }
})






module.exports = router