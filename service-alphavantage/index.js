// require config varilables
require('dotenv').config({
  path: `../.env.${process.env.NODE_ENV}`,
})

const express = require('express')
