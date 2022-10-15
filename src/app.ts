import * as dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan';
import productRouter from './routes/products.route';

const app = express();

// midlewares

app.use(helmet())
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))

dotenv.config()

if(!process.env.APP_PORT){
  process.exit(1)
}

const PORT: number = parseInt(process.env.APP_PORT as string, 10)

const port = 3000 | PORT 

// routes

app.get('/ms-administrative-records/v1', (req, res) => res.send('MS administrative records'))
app.use('/ms-administrative-records/v1/products', productRouter)
// app.use('/ms-administrative-records/v1/users', usersRouter)


export {app, port}