var jwt = require('jsonwebtoken')
const { verifyToken } = require('../config/jwt')

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

const checkId = (req, res, next) => {
  console.log(req.params.id)
  console.log(req.user)
const requestedId = req.params.id
const user = req.user
if (user && user.id === requestedId) {
  next();
} else {
  res.status(403).send('User does not have permission to access this resource'); // User's UUID does not match the requested UUID
}
}

module.exports = { 
  hasValidAuthJwt, checkId}

