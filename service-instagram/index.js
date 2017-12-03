const { JWT_SECRET } = require('dotenv')
  .config({ path: `../.env` })
  .parsed || process.env

const jwt = require('express-jwt')
const app = require('express')()

const HTTP_UNAUTHORIZED = 401
const PORT = 4000

const handleUnauthorizedError = (err, req, res, next) => {
  if (err.status == HTTP_UNAUTHORIZED) {
    return res.status(HTTP_UNAUTHORIZED).send(JWT_SECRET)
  }
  next()
}

app.get(
  '/',
  jwt({ secret: JWT_SECRET }),
  handleUnauthorizedError,
  (req, res) => {
    //TODO: write the service
    res.send(200)
  }
)

app.listen(PORT)
console.log(`🌎  Worldwide on port ${PORT}`) // eslint-disable-line
