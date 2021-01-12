
// OPPGAVE 1
class Account {
    constructor(customerNr, fullName, holdings) {
        this.customerNr = customerNr;
        this.fullName = fullName;
        this.firstName = fullName.split(" ")[0];
        this.lastName = fullName.split(" ")[fullName.split(" ").length -1];
        this.holdings = holdings;
    }
}


// OPPGAVE 2
class ChildrensAccount extends Account {
    constructor(customerNr,firstName, lastName) {
        super(customerNr,firstName,lastName);
        this.holdings = 200;
    }
}

let adult = new Account(194, "Stian Hansen", 0);
let child = new ChildrensAccount(141, "Erlend Hansen");


// OPPGAVE 3
Account.prototype.deposit = function (sum) {
    return this.holdings += sum;
}

Account.prototype.withdraw = function (sum) {
    if (sum <= this.holdings) {
        return this.holdings -= sum;
    }
    else {
        console.log("Request denied")
    }
}


// OPPGAVE 4
Account.prototype.accountInformation = function () {
    return this.fullName + " med kundenummer " + this.customerNr + " har " + this.holdings + " kroner på konto";
}

let kari = new Account(93827100, "Kari Hansen", 429);


// OPPGAVE 5
let checkbox = document.getElementById("isChild");
let customerNumbers = [];
let customerTickers = [];

checkbox.onchange = () => {
    if (checkbox.checked) {
        document.getElementById("deposit-input").disabled = true;
        document.getElementById("deposit-input").value = "";
    }
    else {
        document.getElementById("deposit-input").disabled = false;
    }
}

function generateCustomerNr() {
    let number = customerNumbers.length + 1;
    customerNumbers.push(number);
    return number;
}

function createAccount() {
    let array = [];
    let name = document.getElementById("name-input").value;
    array.push(name);
    let deposit = document.getElementById("deposit-input").value == "" ? 0 : parseInt(document.getElementById("deposit-input").value);
    let isChild = checkbox.checked == true ? true : false;
    if (isChild) {
        for (let i of array) {
            this["" + name.split(" ")[0].toLowerCase()] = new ChildrensAccount(generateCustomerNr(), name);
            customerTickers.push("" + name.split(" ")[0].toLowerCase());
        }
    }
    else {
        for (let i of array) {
            this["" + name.split(" ")[0].toLowerCase()] = new Account(generateCustomerNr(), name ,deposit);
            customerTickers.push("" + name.split(" ")[0].toLowerCase());
        }
    }
    array.shift();
    console.log("Account created for: " + name + " under username: " + name.split(" ")[0].toLowerCase());
}

function transferAmount() {
    let amount = parseFloat(document.getElementById("transfer-sum-input").value);
    let sender = document.getElementById("sender").value;
    let reciever = document.getElementById("reciever").value;
    this[sender].withdraw(amount);
    this[reciever].deposit(amount);
}

function showAccounts() {
    for (let i of customerTickers) {
        console.log(this[i]);
    }
}

function depositAmount() {
    this[document.getElementById("deposit-name-input").value.toLowerCase()].deposit(parseFloat(document.getElementById("deposit-amount").value));
}

function withdrawAmount() {
    this[document.getElementById("withdraw-name-input").value.toLowerCase()].withdraw(parseFloat(document.getElementById("withdraw-amount").value));
}