import * as dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan';
import productRouter from './routes/products.route';
import userRouter from './routes/users.route'
import orderRouter from './routes/orders.route'
import { verifyAccessToken } from './utils/middlewares/verifyAccessToken';

const app = express();

// midlewares

app.use(helmet())
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))

dotenv.config()

if(!process.env.PORT){
  process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)

const port = PORT || 3000 

// routes

// app.get('/ms-administrative-records/v1', (req, res) => res.send('MS administrative records'))
app.get('/', (req, res) => res.send('MS administrative records'))
app.use('/v1/products',verifyAccessToken, productRouter)
app.use('/v1/users',verifyAccessToken, userRouter)
app.use('/v1/orders',verifyAccessToken, orderRouter)

export {app, port}