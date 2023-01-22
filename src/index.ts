import express from 'express'

const app = express();
const port = 3000;

//set endpoint 
app.get('/api', (req,res)=>{
    res.send('hello world')
})

//check for port to avoid allready in use error testing
app.listen(port, ()=> console.log(`Listening on Port ${port}`));

export default app;