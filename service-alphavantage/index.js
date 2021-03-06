const { JWT_SECRET, API_KEY } = require('dotenv')
  .config({ path: `../.env` })
  .parsed || process.env

const alpha = require('alphavantage')({ key: API_KEY })
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
  '/data/:method/:symbol',
  jwt({ secret: JWT_SECRET }),
  handleUnauthorizedError,
  (req, res) => {
    const { method, symbol } = req.params
    const {
      size = 'compact',
      format = 'json',
      interval = '15min',
    } = req.query
    alpha.data[method](symbol, size, format, interval)
    .then(data => {
      res.json(alpha.util.polish(data))
    })
    .catch(() => {
      res.status(500).send('Bad things happened')
    })
  }
)

app.listen(PORT)
console.log(`🌎  Worldwide on port ${PORT}`) // eslint-disable-line
