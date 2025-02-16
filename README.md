# Unit Converter
**A microservice for converting volumetric measurements.**

## Communication Contract
All example code seen here is in JavaScript. However, the implementation for other languages, like Python, would work more or less then same.
Also, the examples here assume that the service is running on localhost:3000. If the service was running somewhere else, the fetch requests
would have to be changed to use that URL instead.

### 1. Requesting Data
**a. Getting unit types**
const response = await fetch('http://localhost:3000/conversions')
const data = await response.json()
console.log(data['units'])
*This would print out to the console: ["pt", "oz", "qt", "cup", "L", "mL", "tsp", "Tbsp"]*

### 2. Receiving Data


### 3. UML Diagram