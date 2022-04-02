const express = require('express')
const cartRoute = express.Router()

cartRoute.get('/', (req,res)=> {
    
    res.status(200).json({
        data : 'data',
        status: '200'
    })
})
cartRoute.get('/', (req,res)=> {
    res.status(200).json({
        data : 'data',
        status: '200'
    })
})
cartRoute.post('/', (req,res)=> {
    res.status(200).json({
        data : 'data',
        status: '200'
    })
})
cartRoute.put('/', (req,res)=> {
    res.status(200).json({
        data : 'data',
        status: '200'
    })
})
cartRoute.delete('/', (req,res)=> {
    res.status(200).json({
        data : 'data',
        status: '200'
    })
})

module.exports = cartRoute