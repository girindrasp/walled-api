require('dotenv').config()
const cors = require('cors')

const express = require("express")
const port = 8080

const app = express()
const bodyParser = require("body-parser")
const userRouter = require("./routers/users.router")

app.use(cors())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
