

// OPPGAVE 1


// Validate number
const validateNumber = (number) => {
    return new Promise((resolve, reject) => {
        // Making sure that the input is indeed a valid number
        if (!isNaN(number) && typeof(number) == "number") {
            // Resolving the promise and passing along the number
            resolve(number);
        }
        else {
            // Rejecting the promise with a new error
            reject(new Error("Input was not a number"))
        }
    });
}

// Check number
const valueNumber = (number) => {
    return new Promise((resolve) => {
        let output;
        // Evaluating if the input is equal to 10 or not
        if (number != 10) {
            var keyword = number > 10 ? "større" : "mindre";
            output = `Tallet ${number} er ${keyword} enn verdien 10.`;
        }
        else {
            output = `Tallet ${number} er av lik verdi som 10.`
        }
        // Resolving the promise. There is no need for å reject here
        resolve(output);
    })
}

// Implementing a function that allows a user to test functionality easily in the console without writing the line every time
let testNumber = (number) => {
    validateNumber(number).then(num => valueNumber(num)).then(result => console.log(result)).catch(msg => console.error(msg));
}

// Checking the functionality with a randomized number upon load
validateNumber(Math.floor(Math.random() * 20)).then((num) => valueNumber(num)).then((result) => console.log(result)).catch((msg) => console.error(msg))



// OPPGAVE 2



// SLUTT



// OPPGAVE 3

