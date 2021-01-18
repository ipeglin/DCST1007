

// OPPGAVE 1


// Validate number
const validateNumber = function (number) {
    return new Promise((resolve, reject) => {
        if (!isNaN(number) && typeof (number) == "number") {
            console.log(`${number} is a valid number`)
            resolve(number);
        }
        else {
            reject(new Error("Input was not a number"))
        }
    });
}

// Check number
const valueNumber = function (number) {
    return new Promise((resolve,reject) => {
        let output;
        if (number != 10) {
            var keyword = number > 10 ? "større" : "mindre";
            output = `${number} er ` + keyword + " enn verdien 10."
        }
        else {
            output = `${number} er av samme verdi som 10.`;
        }
        resolve(output);
    })
}

// Print number

validateNumber(2).then(res => console.log(valueNumber(res))).catch(err => console.error(err));

// SLUTT



// OPPGAVE 2



// SLUTT



// OPPGAVE 3

