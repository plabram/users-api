var jwt = require('jsonwebtoken')

const signToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {expiresIn: 24 * 60 * 60})
return token
}

const verifyToken = (token) => {
  const payload = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
  return payload
}

module.exports = {
  signToken, verifyToken
}