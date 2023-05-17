const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const postmodel = require('../models/post')

router.post('/',async(req,res)=>{
    const postbody = {
        ... req.body
    }
     try
     {
        const addpost = await postmodel.create(postbody)
        return res.json(addpost)
     }
     catch(err)
     {
        res.status(500).send(err)
     }
})

router.get('/',async(req,res)=>{
     try
     {
        const getpost = await postmodel.find({}).populate({path:'auther',select:['firstname','lastname']})
        return res.send(getpost)
     }
     catch
     {
        res.status(500).send(err)
     }
})

router.get('/:id',async(req,res)=>{
    const id = req.params.id;
    try
    {
        const getoneuser = await  postmodel.find({_id:id})
        return res.send(getoneuser)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
})

router.patch('/:id',async(req, res) => {
    const id = req.params.id
    const updates = req.body
     try
     {
        const updatepost = await postmodel.findByIdAndUpdate(id,updates)
        return res.json(updatepost)
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
      const deletepost = await postmodel.findByIdAndDelete({_id:id})
      return res.json(deletepost)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
})


module.exports = router