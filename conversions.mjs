const conversionList = {
    pt: ['oz', 'cup', 'qt'],
    oz: ['pt', 'cup', 'qt'],
    cup: ['pt', 'oz', 'qt'],
    qt: ['pt', 'oz', 'cup']
}

const conversionFunctions = {
    pt: {
        oz: (val) => {return val * 16},
        cup: (val) => {return val * 2},
        qt: (val) => {return val / 2}
    },
    oz: {
        pt: (val) => {return val / 16},
        cup: (val) => {return val / 8},
        qt: (val) => {return val / 32}
    },
    cup: {
        pt: (val) => {return val / 2},
        oz: (val) => {return val * 8},
        qt: (val) => {return val / 4}
    },
    qt: {
        pt: (val) => {return val * 2},
        oz: (val) => {return val * 32},
        cup: (val) => {return val * 4}
    }
}

export {conversionList, conversionFunctions}