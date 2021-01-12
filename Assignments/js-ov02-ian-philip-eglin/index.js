
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

// console.log(adult);
// console.log(child);


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

// console.log(kari)


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
    let name = document.getElementById("name-input");
    let deposit = document.getElementById("deposit-input")
    let isChild = checkbox.checked == true ? true : false;
    if (isChild) {
        
    }
}