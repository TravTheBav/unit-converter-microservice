import express from 'express'
import 'dotenv/config'
import { unitsList, conversionFunctions } from './conversions.mjs'

// create an new express instance
const PORT = process.env.PORT
const app = express()
app.use(express.json())

// Used to extract properties from request body into separate object.
const extractConversionFromBody = function (body) {
    return { 
        fromUnit: body.fromUnit,
        toUnit: body.toUnit,
        val: body.val,
    }
}

// Used to make sure the conversion can be made by looking up the 'from' and 'to'
// strings in the conversionFunctions object.
const checkValidConversion = function (from, to) {
    if (from in conversionFunctions && to in conversionFunctions[from]) {
        return true
    }

    return false
}

// Used to get correct conversion function and call that function to perform
// the conversion
const convertUnits = function (conversion) {
    const conversionFunction = conversionFunctions[conversion["fromUnit"]][conversion["toUnit"]]
    return conversionFunction(conversion["val"])
}

// ================================= ROUTES =====================================//

// Gets all conversions that can be made; for each conversion, the first string
// is the 'from' unit and the second string is the 'to' unit.
// example: ['pt', 'oz'] => from pint to ounce
app.get('/conversions', (req, res) => {
    const returnObject = { units: unitsList }
    console.log(`sending response: ${JSON.stringify(returnObject)}`)
    res.send(returnObject)
})

// Performs the conversion and returns the value
app.post('/convert', (req, res) => {
    const data = extractConversionFromBody(req.body)
    const returnObject = { result: null }

    // Either performs the conversion and sends back the result, or tells the client
    // that the requested conversion is not possible
    if (checkValidConversion(data["fromUnit"], data["toUnit"])) {
        returnObject.result = convertUnits(data)
        console.log(`sending response: ${JSON.stringify(returnObject)}`)
        res.send(returnObject)
    } else {
        res.status(400).send('The conversion service cannot calculate that type of conversion; \
            send a request to /conversions to see which conversions can be made.')
    }
})

// Performs multiple conversions in one request and returns the values in order. Can also
// be used to perform one conversion, but it will still be contained in a JSON array
app.post('/convert-multiple', (req, res) => {
    const conversions = req.body.conversions
    const returnObject = { result: [] }

    conversions.forEach(conversion => {
        if (checkValidConversion(conversion["fromUnit"], conversion["toUnit"])) {
            returnObject.result.push(convertUnits(conversion))
        } else {
            res.status(400).send('The conversion service could not calculate one or more of these conversions; \
                send a request to /conversions to see which conversions can be made.')
            return
        }
    })

    console.log(`sending response: ${JSON.stringify(returnObject)}`)
    res.send(returnObject)
})

// starts the server at the given port
app.listen(PORT, () => {
    console.log(`Unit converter service listening on port ${PORT}`)
})
