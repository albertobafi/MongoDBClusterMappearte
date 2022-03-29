const Artist = require("../models/artist.model")
const createError = require("http-errors")
const bcrypt = require('bcrypt')
const jwt = require('../lib/jwt.lib')

async function create(artistData) {
  const artistFound = await Artist.findOne({ email: artistData.email })
  if (artistFound) {
    throw new createError(412, "Artist already exists")
  }
  const hash = await bcrypt.hash(artistData.password,10)
  artistData.password = hash
  return Artist.create(artistData)
}

function getAll(){
    return Artist.find()
}

async function deleteById(artistId){
    const artistFound = await Artist.findById(artistId)
    if(!artistFound){
        throw new createError(404,'Artist not found')
    }
    return Artist.findByIdAndDelete(artistId)
}

async function updateById(id,artistData){
    const artistFound = await Artist.findById(id)
    if(!artistFound){
        throw new createError(404,'Artist not found')
    }
    return Artist.findByIdAndUpdate(id,artistData)
}

async function login(email,password){
    const artistFound = await Artist.findOne({email})
    if(!artistFound){
        throw new createError(401,'Invalid Artist')
    }
    const isValidPassword = await bcrypt.compare(password,artistFound.password)
    if(!isValidPassword){
        throw new createError(401,'Invalid Artist')
    }

    return jwt.sign({id:artistFound._id})
}



module.exports = {
    create,
    getAll,
    deleteById,
    updateById,
    login
}