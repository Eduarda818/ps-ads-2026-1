import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

import indexRouter from './routes/index.js'
import authMiddleware from './middleware/auth.js'
import customersRoute from './routes/customers.js'
import carsRoute from './routes/cars.js'
import usersRoute from './routes/users.js'
import sellerRouter from './routes/seller.js'

const app = express()

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : '*'

app.use(cors({
  origin: allowedOrigins,
}))

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)

/******* MIDDLEWARE DE AUTENTICAÇÃO *******/
app.use(authMiddleware)

/**************** ROTAS *******************/
app.use('/customers', customersRoute)
app.use('/cars', carsRoute)
app.use('/users', usersRoute)
app.use('/seller', sellerRouter)

export default app