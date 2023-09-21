var jwt = require('jsonwebtoken')
const { verifyToken } = require('../config/jwt')

const isAuthenticated = () => {
  (req, res, next)=>{
    const {token} = req.query
    if (token === process.env.QUERY_AUTH_TOKEN) {
      next()
      return
    } else {
      res.status(401).json({data: "Wrong token authentification"})
    }
    }
}

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
  isAuthenticated, 
  hasValidAuthJwt}