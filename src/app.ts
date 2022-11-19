import * as dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan';
import productRouter from './routes/products.route';
import userRouter from './routes/users.route'
import orderRouter from './routes/orders.route'

const app = express();

// midlewares

// app.use(helmet())
// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))

dotenv.config()

if(!process.env.APP_PORT){
  process.exit(1)
}

const PORT: number = parseInt(process.env.APP_PORT as string, 10)

const port = PORT || 3000 
// const port = 3001

// routes

// app.get('/ms-administrative-records/v1', (req, res) => res.send('MS administrative records'))
app.get('/', (req, res) => res.send('MS administrative records'))
app.use('/v1/products', productRouter)
app.use('/v1/users', userRouter)
app.use('/v1/orders', orderRouter)

export {app, port}