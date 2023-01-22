import express from 'express';
import { resourceLimits } from 'worker_threads';
import image from './api/image'

const router = express.Router();

//get request for /api endpoint
router.get('/', (req,res)=>{
    res.send("api")
});

//use express middleware to get /api/image endpoint
router.use('/image',image);

export default router;