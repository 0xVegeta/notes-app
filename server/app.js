const express = require('express')
const dotenv = require("dotenv");
dotenv.config({ path: `.env` });
const bodyParser = require('body-parser')
const apiRouter = require('./routes/api')
const connectDB = require('./config/db')
const app = express()
connectDB()

const PORT = 3000
app.use(bodyParser.json())
app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`
  ============================================================


        Server running on 
        PORT: ${PORT}


  ============================================================
  `);
})