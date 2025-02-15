import express from 'express'
import 'dotenv/config'
import { conversionList, conversionFunctions } from './conversions.mjs'

// create an new express instance
const PORT = process.env.PORT
const app = express()
app.use(express.json())

// makes sure the conversion can be made
const checkValidConversion = function (from, to) {
    if (from in conversionFunctions && to in conversionFunctions[from]) {
        return true
    }

    return false
}

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

    // Either performs the conversion and sends back the result, or tells the client
    // that the requested conversion is not possible
    if (checkValidConversion(data["fromUnit"], data["toUnit"])) {
        const func = conversionFunctions[data["fromUnit"]][data["toUnit"]]
        const convertedVal = func(data["val"])
    
        res.json(convertedVal)
    } else {
        res.status(400).send('The conversion service cannot calculate that type of conversion; \
            send a request to /conversions to see which conversions can be made.')
    }
})

// Performs multiple conversions in one request and returns the values in order. Can also
// be used to perform one conversion, but it will still be contained in a JSON array
app.post('/convert-multiple', (req, res) => {
    const conversions = req.body.conversions
    const vals = []

    conversions.forEach(conversion => {
        if (checkValidConversion(conversion["fromUnit"], conversion["toUnit"])) {
            const func = conversionFunctions[conversion["fromUnit"]][conversion["toUnit"]]
            const convertedVal = func(conversion["val"])
            vals.push(convertedVal)
        } else {
            res.status(400).send('The conversion service could not calculate one or more of these conversions; \
                send a request to /conversions to see which conversions can be made.')
        }
    })
    
    res.json(vals)
})

// starts the server at the given port
app.listen(PORT, () => {
    console.log(`Unit converter service listening on port ${PORT}`)
})