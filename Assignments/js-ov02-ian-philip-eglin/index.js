
// OPPGAVE 1

// Creating a class for all customers
class Account {
    constructor(customerNr, fullName, holdings) {
        this.customerNr = customerNr;
        this.fullName = fullName;
        // Splitting the names to make it a little friendlier when displayed
        this.firstName = fullName.split(" ")[0];
        this.lastName = fullName.split(" ")[fullName.split(" ").length -1];
        this.holdings = holdings;
    }
}



// OPPGAVE 2

// Creating a class for all accountholders who are children
class ChildrensAccount extends Account {
    constructor(customerNr, firstName, lastName) {
        // Inherit values from the mothership... or class
        super(customerNr, firstName, lastName);
        // Give the child 200 kr
        this.holdings = 200;
    }
}



// OPPGAVE 3

// Creating method for depositing money into the respective persons account
Account.prototype.deposit = function (sum) {
    return this.holdings += sum;
}

// Creating method for withdrawing money from an account. The lord giveth and he can take i'th away.
Account.prototype.withdraw = function (sum) {
    // Double checking that the account holder acctually have the money
    if (sum <= this.holdings) {
        return this.holdings -= sum;
    }
    else {
        console.log("Request denied")
    }
}



// OPPGAVE 4

// Creating method for displaying account information
Account.prototype.accountInformation = function () {
    return this.fullName + " med kundenummer " + this.customerNr + " har " + this.holdings + " kroner på konto";
}

// Creating a new Account for Kari
let kari = new Account(93827100, "Kari Hansen", 429);



// OPPGAVE 5
let checkbox = document.getElementById("isChild");

// Creating an array to keep track of customernumbers
let customerNumbers = [];
// Keeping track of all the accounts' usernames
let customerTickers = [];

// Disabling the startup deposit input if account is for a child
checkbox.onchange = () => {
    if (checkbox.checked) {
        document.getElementById("deposit-input").disabled = true;
        document.getElementById("deposit-input").value = "";
    }
    else {
        document.getElementById("deposit-input").disabled = false;
    }
}

// Returning an unused customer number to be used
function generateCustomerNr() {
    // Number looks more realistic when there are many digits :)
    let number = customerNumbers.length + 1000001;
    customerNumbers.push(number);
    return number;
}

// Function to make the new account with a ticker/username respective to the account holders name
function createAccount() {
    // Getting all the values needed
    let name = document.getElementById("name-input").value;
    let deposit = document.getElementById("deposit-input").value == "" ? 0 : parseInt(document.getElementById("deposit-input").value);
    // Checking if the account is for a child
    let isChild = checkbox.checked == true ? true : false;

    // If the account is for a child, create a child account
    if (isChild) {
        this["" + name.split(" ")[0].toLowerCase()] = new ChildrensAccount(generateCustomerNr(), name);
        customerTickers.push("" + name.split(" ")[0].toLowerCase());
    }
    else {
        this["" + name.split(" ")[0].toLowerCase()] = new Account(generateCustomerNr(), name ,deposit);
        customerTickers.push("" + name.split(" ")[0].toLowerCase());
    }

    // Logging to the console that the user has been made
    console.log("Account created for: " + name + " under username: " + name.split(" ")[0].toLowerCase());
    clearInputs();
}

function transferAmount() {
    let amount = parseFloat(document.getElementById("transfer-sum-input").value);
    let sender = document.getElementById("sender").value;
    let reciever = document.getElementById("reciever").value;
    // Using the methods for the respective account holders
    this[sender].withdraw(amount);
    this[reciever].deposit(amount);

    clearInputs();
    showAccounts();
}

// Function to deposit money into an account
function depositAmount() {
    // Depositing money for the respective account holders
    this[document.getElementById("deposit-name-input").value.toLowerCase()].deposit(parseFloat(document.getElementById("deposit-amount").value));
    clearInputs();
    showAccounts();
}

// Function to withdraw money from an account
function withdrawAmount() {
    // Withdrawing money for the respective account holders
    this[document.getElementById("withdraw-name-input").value.toLowerCase()].withdraw(parseFloat(document.getElementById("withdraw-amount").value));
    clearInputs();
    showAccounts();
}

// Function that display all the customers in full detail
function showAccounts() {
    for (let i of customerTickers) {
        console.log(this[i]);
    }
}

// Clearing all inputfields on the page
function clearInputs() {
    document.getElementById("name-input").value = "";
    document.getElementById("deposit-input").value = "";
    document.getElementById("deposit-input").disabled = false;
    document.getElementById("isChild").checked = false;
    document.getElementById("sender").value = "";
    document.getElementById("reciever").value = "";
    document.getElementById("transfer-sum-input").value = "";
    document.getElementById("deposit-name-input").value = "";
    document.getElementById("deposit-amount").value = "";
    document.getElementById("withdraw-name-input").value = "";
    document.getElementById("withdraw-amount").value = "";
}