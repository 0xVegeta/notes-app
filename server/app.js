const express = require('express')
const bodyParser = require('body-parser')
const apiRouter = require('./routes/api')
const app = express()

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