const express  =require('express')
const app = express()
const config = require('./configs/config')

app.listen(config.PORT, ()=>{
    console.log(new Date(), "listening on port:", config.PORT);
})
