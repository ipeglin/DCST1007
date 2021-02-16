

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
    return new Promise(resolve => {
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
    validateNumber(number)
        .then(num => valueNumber(num))
        .then(result => console.log(result))
        .catch(msg => console.error(msg));
}

// Checking the functionality with a randomized number upon load
validateNumber(Math.floor(Math.random() * 20))
    .then((num) => valueNumber(num))
    .then((result) => console.log(result))
    .catch((msg) => console.error(msg))



// OPPGAVE 2
// Converting all the strings in the array to upper case
let convertToUpperCase = (array) => {
    return new Promise((resolve, reject) => {
        // If some element is not a string
        try {
            // Creating a new array since the array passed into the function cannot be manipulated with toUpperCase()
            let newArray = [];
            // Pushing all upper case elements to new array
            for (let element of array) {
                newArray.push(element.toUpperCase());
            }
            // Passing along the upper case array
            resolve(newArray);
        }
        // Pass along a new error
        catch {
            reject(new Error("Not all elements are of class <String>"));
        }
    });
}

// Function that sorts the array
let sortArray = (array) => {
    return new Promise(resolve => {
        array.sort();
        // Passing along the sorted array
        resolve(array);
    });
}

// Function that allows for easily checking functionality in the console
let testArray = (array) => {
    convertToUpperCase(array)
        .then(result => sortArray(result))
        .then(result => console.log(result))
        .catch(msg => console.error(msg));    
}

// Hard coded test of the functionallity for demonstration purposes
let baseArray = ["c", "a", "b", "hello world", "3", "1", "2"];
convertToUpperCase(baseArray)
    .then(result => sortArray(result))
    .then(result => console.log(result))
    .catch(msg => console.error(msg));



// OPPGAVE 3
// Function that displays the avatar of a given github user on the page
let getUserData = (username) => {
    return fetch(`https://api.github.com/users/${username}`)
        .then(result => result.json())
        .then(data => document.getElementById("user-avatar").src = data.avatar_url)
        .catch(msg => console.error(msg));
}

// Using my own username as an example
getUserData("ipeglin")