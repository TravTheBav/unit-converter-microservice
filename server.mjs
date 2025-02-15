import express from 'express'
import 'dotenv/config'


const PORT = process.env.PORT
const app = express()
app.use(express())

// starts the server at the given port
app.listen(PORT, () => {
    console.log(`Unit converter service listening on port ${PORT}`)
})