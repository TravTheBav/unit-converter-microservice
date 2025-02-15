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

    // makes sure the conversion can be made
    const checkValidConversion = function (from, to) {
        if (from in conversionFunctions && to in conversionFunctions[from]) {
            return true
        }

        return false
    }

    if (checkValidConversion(data["fromUnit"], data["toUnit"])) {
        const func = conversionFunctions[data["fromUnit"]][data["toUnit"]]
        const convertedVal = func(data["val"])
    
        res.json(convertedVal)
    } else {
        res.status(400).send('The conversion service cannot calculate that type of conversion; \
            send a request to /conversions to see which conversions can be made.')
    }
})

// starts the server at the given port
app.listen(PORT, () => {
    console.log(`Unit converter service listening on port ${PORT}`)
})