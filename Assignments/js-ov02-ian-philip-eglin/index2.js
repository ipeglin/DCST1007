
let throwError = (err) => {
    return console.error(new Error(err));
}

let generateCustomerNr = () => {
    let customerNr = Math.floor(Math.random() * 1000000) + 1000001;
    if (customerNr > 9999999) {
        generateCustomerNr()
    }
    else {
        return customerNr;
    }
}

let purgeNumbers = (name) => {
    let digits = ["0", "1", "2", "3", "4", "5", "7", "8", "9"];
    let newName = "";
    for (let char of name) {
        if (!(char in digits)) {
            newName += char;
        }
    }
    return newName;
}

let formatName = (name) => {
    try {
        name = purgeNumbers(name);
    let names = name.split(" ").map(name => name[0].toUpperCase() + name.substring(1));
    return names.join(" ");
    }
    catch {
        throwError("Invalid name input");
    }
}

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

// OPPGAVE 1

class Account {
    constructor(fullName, holdings) {
        this.fullName = fullName;
        this.firstName = fullName.split(" ")[0];
        this.lastName = fullName.split(" ")[fullName.split(" ").length - 1];
        
        this.holdings = holdings;
        this.customerNr = generateCustomerNr();
    }
}

// OPPGAVE 2

class ChildrensAccount extends Account {
    constructor(firstName, lastName, customerNr) {
        super(firstName, lastName, customerNr);
        this.holdings = 200;
    }
}

// OPPGAVE 3

Account.prototype.deposit = function (sum) {
    return this.holdings += sum;
}

Account.prototype.withdraw = function (sum) {
    if (sum <= this.holdings) {
        return this.holdings -= sum;
    }
    else {
        console.log("Request denied");
        throwError("You do not withdraw money you do not have");
    }
}

// OPPGAVE 4


Account.prototype.accountInformation = function () {
    return this.fullName + " med kundenummer " + this.customerNr + " har " + this.holdings + " kroner på konto";
}

// Creating a new Account for Kari
let kari = new Account("Kari Hansen", 429);

// OPPGAVE 5

let checkbox = document.getElementById("isChild");

checkbox.onchange = () => {
    if (checkbox.checked) {
        document.getElementById("deposit-input").disabled = true;
        document.getElementById("deposit-input").value = "";
    }
    else {
        document.getElementById("deposit-input").disabled = false;
    }
}

function createAccount() {
    let name = document.getElementById("name-input").value;
    let deposit = document.getElementById("deposit-input").value == "" ? 0 : parseInt(document.getElementById("deposit-input").value);
    let isChild = checkbox.checked == true ? true : false;

    if (name.length != 0 && name.indexOf(" ") != -1) {
        name = formatName(name);
        try {
            if (isChild) {
                this["" + name.split(" ")[0].toLowerCase()] = new ChildrensAccount(name);
            }
            else {
                this["" + name.split(" ")[0].toLowerCase()] = new Account(name ,deposit);
            }
            console.log("Account created for: " + name + " under username: " + name.split(" ")[0].toLowerCase());    
        }
        catch {
            throwError("Invalid input");
        }
    }
    else {
        throwError("Invalid name input")
    }
    clearInputs();
}

function transferAmount() {
    let amount = parseFloat(document.getElementById("transfer-sum-input").value);
    let sender = document.getElementById("sender").value;
    let reciever = document.getElementById("reciever").value;

    if (sender != reciever) {
        this[sender].withdraw(amount);
        this[reciever].deposit(amount);
    }
    else {
        throwError("You have chosen two of the same account")
    }
    
    clearInputs();
    showAccounts();
}

function depositAmount() {
    this[document.getElementById("deposit-name-input").value.toLowerCase()].deposit(parseFloat(document.getElementById("deposit-amount").value));
    clearInputs();
    showAccounts();
}

function withdrawAmount() {
    this[document.getElementById("withdraw-name-input").value.toLowerCase()].withdraw(parseFloat(document.getElementById("withdraw-amount").value));
    clearInputs();
    showAccounts();
}

function showAccounts() {
    for (let i of customerTickers) {
        console.log(this[i]);
    }
}