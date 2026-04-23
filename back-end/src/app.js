import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

import indexRouter from './routes/index.js'

const app = express()

// Proteção para o ALLOWED_ORIGINS: se não houver no .env, ele não quebra o split
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : '*'

app.use(cors({
  origin: allowedOrigins,
  // credentials: true 
}))

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)

/******* MIDDLEWARE DE AUTENTICAÇÃO *******/


import authMiddleware from './middleware/auth.js'
app.use(authMiddleware)


/**************** ROTAS *******************/

import customersRoute from './routes/customers.js'
app.use('/customers', customersRoute)

import carsRoute from './routes/cars.js'
app.use('/cars', carsRoute)

import usersRoute from './routes/users.js'
app.use('/users', usersRoute)

// import do saller
import sellerRouter from './routes/seller.js' 
app.use('/seller', sellerRouter)

export default app
