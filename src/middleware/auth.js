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

module.exports = { 
  hasValidAuthJwt}