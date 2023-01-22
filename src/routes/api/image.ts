import express from 'express';

const image = express.Router();

image.get('/', (req,res)=>{
    res.send("image")
});

export default image;