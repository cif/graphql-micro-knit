const { JWT_SECRET } = require('dotenv')
  .config({ path: `./.env` })
  .parsed

const APP_TO_APP_DEV_TOKEN = 'APP_TO_APP_DEV_TOKEN'
const tokenizer = require('jsonwebtoken')
const token = tokenizer.sign(
  { profile: APP_TO_APP_DEV_TOKEN },
  JWT_SECRET
)

// eslint-disable-next-line
console.log('🎟️  Here is your token, use it wisely!\n', token)
