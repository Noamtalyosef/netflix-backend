import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import seedRouter from './routes/seedRoutes.js'
import contentRouter from './routes/contentRoutes.js'
import listsRouter from './routes/listsRoutes.js'
import authRouter from './routes/authRoutes.js'
import usersInfoRouter from './routes/usersInfoRouts.js'

dotenv.config()

const port = process.env.PORT || 5000

const app = express()
app.use(express.json());

app.use(cors())



app.use(express.urlencoded({extended:true}))

app.use('/api/seed',seedRouter);
app.use('/api/contents',contentRouter);
app.use('/api/lists',listsRouter);
app.use('/api/auth',authRouter);
app.use('/api/usersInfo',usersInfoRouter);



mongoose
  .connect(process.env.MONGO_PW)
  .then(() => {
    app.listen(port, () => {
      console.log('Server is running on port ' + port)
    })
    console.log('Connection to MONGO DB is success')
  })
  .catch(err => {
    console.log(`Connecting to MONGO DB is faild : ${err}`)
  })
