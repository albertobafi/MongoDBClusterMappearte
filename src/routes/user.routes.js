const express = require('express')
const router = express.Router()
const users = require('../usecases/user.usecase')

router.get('/',async(request,response)=>{
    try {
        const allUsers = await users.getAll()
        response.json({
            ok:true,
            message: 'Here are all the users',
            allUsers
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
        const userId = await users.deleteById(request.params.id)
        response.json({
            ok:true,
            message: 'user deleted',
            userId
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
        const userUpdated = await users.updateById(request.params.id,request.body)
        response.json({
            ok:true,
            message: 'user updated',
            userUpdated
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
        const newUser = await users.create(request.body)
        response.json({
            ok:true,
            newUser
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