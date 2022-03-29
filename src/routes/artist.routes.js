const express = require('express')
const router = express.Router()
const artists = require('../usecases/artist.usecase')

router.get('/',async(request,response)=>{
    try {
        const allArtists = await artists.getAll()
        response.json({
            ok:true,
            message: 'Here are all the artists',
            allArtists
        })
    } catch (error) {
        response.status(error.status)
        response.json({
            ok:false,
            error
        })
    }
})

router.delete('/:id',async(request,response)=>{
    try {
        const artistId = await artists.deleteById(request.params.id)
        response.json({
            ok:true,
            message: 'artist deleted',
            artistId
        })
    } catch (error) {
        response.status(error.status)
        response.json({
            ok:false,
            error
        })
    }
})

router.patch('/:id',async(request,response)=>{
    try {
        const artistUpdated = await artists.updateById(request.params.id,request.body)
        response.json({
            ok:true,
            message: 'artist updated',
            artistUpdated
        })
    } catch (error) {
        response.status(error.status)
        response.json({
            ok:false,
            error
        })
    }
})

router.post('/',async(request,response)=>{
    try {
        const newArtist = await artists.create(request.body)
        response.json({
            ok:true,
            newArtist
        })
    } catch (error) {
        response.status(error.status)
        response.json({
            ok:false,
            error
        })
    }
})



module.exports = router