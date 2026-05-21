import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index.js'

const app = express()

import cors from 'cors'

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true   // Habilita o envio de cookies para o front-end
}))

app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

// (...código existente...)

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

export default app