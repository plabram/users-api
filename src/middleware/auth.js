var jwt = require('jsonwebtoken')
const { verifyToken } = require('../config/jwt')
// const { getVanById } = require('../controllers/vans')
const { getUserByVanIdFromDb } = require('../repositories/users')

const hasValidAuthJwt = (req,res,next) => {
    try {
  const {authorization} = req.headers
  const [, token] = authorization.split(" ")
    const payload = verifyToken(token)
    req.user = payload
    next()
    } catch (err) {
    res.status(401).json({data: "Not authenticated"})
  }
}

const checkUser = (req, res, next) => {
const requestedId = req.params.id
const user = req.user
if (user && user.id === requestedId) {
  console.log("User has permission to access this resource 😎")
  next();
} else {
  res.status(403).send('User does not have permission to access this resource'); // User's UUID does not match the requested UUID
}
}

const checkUserByVan = async (req, res, next) => {
const requestedVanId = req.params.id
const user = req.user
const owner = await getUserByVanIdFromDb(requestedVanId)
if (user && user.id === owner) {
  console.log("User has permission to access this resource 😎")
  next();
} else {
  res.status(403).send('User does not have permission to access this resource'); // User's UUID does not match the requested UUID
}
}

module.exports = { 
  hasValidAuthJwt, checkUser, checkUserByVan}

