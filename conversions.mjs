const unitsList = [
    'pt', 'oz', 'qt', 'cup', 'L', 'mL', 'tsp', 'Tbsp'
]

// All conversion functions are based on the formulas given by Google
// when typing a conversion into Google search.
const conversionFunctions = {
    pt: {
        oz: (val) => {return (val * 16).toFixed(2)},
        cup: (val) => {return (val * 2).toFixed(2)},
        qt: (val) => {return (val / 2).toFixed(2)},
        L: (val) => {return (val / 2.113).toFixed(2)},
        mL: (val) => {return (val * 473.2).toFixed(2)},
        tsp: (val) => {return (val * 96).toFixed(2)},
        Tbsp: (val) => {return (val * 32).toFixed(2)}
    },
    oz: {
        pt: (val) => {return (val / 16).toFixed(2)},
        cup: (val) => {return (val / 8).toFixed(2)},
        qt: (val) => {return (val / 32).toFixed(2)},
        L: (val) => {return (val / 33.814).toFixed(2)},
        mL: (val) => {return (val * 29.574).toFixed(2)},
        tsp: (val) => {return (val * 6).toFixed(2)},
        Tbsp: (val) => {return (val * 2).toFixed(2)}
    },
    cup: {
        pt: (val) => {return (val / 2).toFixed(2)},
        oz: (val) => {return (val * 8).toFixed(2)},
        qt: (val) => {return (val / 4).toFixed(2)},
        L: (val) => {return (val / 4.227).toFixed(2)},
        mL: (val) => {return (val * 240).toFixed(2)},
        tsp: (val) => {return (val * 48).toFixed(2)},
        Tbsp: (val) => {return (val * 16).toFixed(2)}
    },
    qt: {
        pt: (val) => {return (val * 2).toFixed(2)},
        oz: (val) => {return (val * 32).toFixed(2)},
        cup: (val) => {return (val * 4).toFixed(2)},
        L: (val) => {return (val / 1.057).toFixed(2)},
        mL: (val) => {return (val * 946.4).toFixed(2)},
        tsp: (val) => {return (val * 192).toFixed(2)},
        Tbsp: (val) => {return (val * 64).toFixed(2)}
    },
    L: {
        pt: (val) => {return (val * 2.113).toFixed(2)},
        oz: (val) => {return (val * 33.814).toFixed(2)},
        cup: (val) => {return (val * 4.227).toFixed(2)},
        qt: (val) => {return (val * 1.057).toFixed(2)},
        mL: (val) => {return (val * 1000).toFixed(2)},
        tsp: (val) => {return (val * 202.884).toFixed(2)},
        Tbsp: (val) => {return (val * 67.628).toFixed(2)}
    },
    mL: {
        pt: (val) => {return (val / 473.2).toFixed(2)},
        oz: (val) => {return (val / 29.574).toFixed(2)},
        cup: (val) => {return (val / 236.6).toFixed(2)},
        qt: (val) => {return (val / 946.4).toFixed(2)},
        L: (val) => {return (val / 1000).toFixed(2)},
        tsp: (val) => {return (val / 4.929).toFixed(2)},
        Tbsp: (val) => {return (val / 14.787).toFixed(2)}
    },
    tsp: {
        pt: (val) => {return (val / 96).toFixed(2)},
        oz: (val) => {return (val / 6).toFixed(2)},
        cup: (val) => {return (val / 48).toFixed(2)},
        qt: (val) => {return (val / 192).toFixed(2)},
        L: (val) => {return (val / 202.9).toFixed(2)},
        mL: (val) => {return (val * 4.929).toFixed(2)},
        Tbsp: (val) => {return (val / 3).toFixed(2)}
    },
    Tbsp: {
        pt: (val) => {return (val / 32).toFixed(2)},
        qt: (val) => {return (val / 64).toFixed(2)},
        oz: (val) => {return (val / 2).toFixed(2)},
        cup: (val) => {return (val / 16).toFixed(2)},
        L: (val) => {return (val / 67.628).toFixed(2)},
        mL: (val) => {return (val * 14.787).toFixed(2)},
        tsp: (val) => {return (val * 3).toFixed(2)}
    }
}

export {unitsList, conversionFunctions}