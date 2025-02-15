import express from 'express'
import 'dotenv/config'
import { conversionList, conversionFunctions } from './conversions.mjs'


const PORT = process.env.PORT
const app = express()
app.use(express.json())


// Gets all conversions that can be made; for each conversion, the first string
// is the 'from' unit and the second string is the 'to' unit.
// example: ['pt', 'oz'] => from pint to ounce
app.get('/conversions', (req, res) => {
    res.json(conversionList)
})

// Performs the conversion and returns the value
app.post('/convert', (req, res) => {
    const data = {
        fromUnit: req.body.fromUnit,
        toUnit: req.body.toUnit,
        val: req.body.val
    }

    const func = conversionFunctions[data["fromUnit"]][data["toUnit"]]
    const convertedVal = func(data["val"])

    res.json(convertedVal)
})

// starts the server at the given port
app.listen(PORT, () => {
    console.log(`Unit converter service listening on port ${PORT}`)
})