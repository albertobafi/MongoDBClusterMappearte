const User = require("../models/user.model")
const createError = require("http-errors")
const bcrypt = require('bcrypt')
const jwt = require('../lib/jwt.lib')

async function create(userData) {
  const userFound = await User.findOne({ email: userData.email })
  if (userFound) {
    throw new createError(412, "User already exists")
  }
  const hash = await bcrypt.hash(userData.password,10)
  userData.password = hash
  return User.create(userData)
}

function getAll(){
    return User.find()
}

async function deleteById(userId){
    const userFound = await User.findById(userId)
    if(!userFound){
        throw new createError(404,'User not found')
    }
    return User.findByIdAndDelete(userId)
}

async function updateById(id,userData){
    const userFound = await User.findById(id)
    if(!userFound){
        throw new createError(404,'User not found')
    }
    return User.findByIdAndUpdate(id,userData)
}

async function login(email,password){
    const userFound = await User.findOne({email})
    if(!userFound){
        throw new createError(401,'Invalid user')
    }
    const isValidPassword = await bcrypt.compare(password,userFound.password)
    if(!isValidPassword){
        throw new createError(401,'Invalid user')
    }

    return jwt.sign({id:userFound._id})
}



module.exports = {
    create,
    getAll,
    deleteById,
    updateById,
    login
}