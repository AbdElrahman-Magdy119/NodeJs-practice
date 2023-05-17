const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const postmodel = require('../models/post')

router.post('/',(req,res)=>{
    const postbody = {
        ... req.body
    }
     postmodel.create(postbody,(err,createdpost)=>{
        if(!err) return res.json(createdpost)
        res.status(500).send(err)
     })
})
router.get('/',(req,res)=>{
    postmodel.find({}, (err,posts) =>{
          if(!err){
            return res.send(posts)
          }
          res.status(500).send(err)
    }).populate({path:'auther',select:['firstname','lastname']})
})
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    postmodel.find({_id:id}, (err,post) =>{
          if(!err){
            return res.send(post)
          }
          res.status(500).send(err)
    })
})
router.patch('/:id',(req, res) => {
    const id = req.params.id
    const updates = req.body
    postmodel.findByIdAndUpdate(id,updates,(err,post)=>{
            if(!err) return res.json(post)
            res.status(500).send(err)
        })
})

router.delete('/:id',(req,res) => {
    const id = req.params.id
    postmodel.findByIdAndDelete({_id:id},(err,post)=>{
        if(!err) return res.json(post)
        res.status(500).send(err)
    })
})






module.exports = router