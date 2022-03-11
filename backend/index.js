const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000

// enable cross origin requests
app.use(cors())

// database connection
const connectToMongo = require("./db")
connectToMongo()

// Init Middleware
app.use(express.json({extended: false}))

app.get('/', (req, res) => {
  res.send('Node Server Running')
})

// Define Routes
app.use("/api/users", require("./routes/api/users"))
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/complain", require("./routes/api/complain"))
app.use("/api/profile", require("./routes/api/profile"))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})