
// OPPGAVE 1

// Creating a class and a constructor for cars containing properties (registration number, car brand, model and current speed)
class Bil {
    constructor(registreringsnr, merke, årsmodell, hastighet) {
        this.registreringsnr = registreringsnr;
        this.merke = merke;
        this.årsmodell = årsmodell;
        this.hastighet = hastighet;
    }
}


// OPPGAVE 2

// Creating three  cars with different values for the different properties
let car1 = new Bil("41492", "Fiat", 2008, 40);
let car2 = new Bil("911", "Porsche", 2019, 120);
let car3 = new Bil("67482", "Audi", 2017, 90);

// OPPGAVE 3


Bil.prototype.gass = function () {
    return this.hastighet += 10;
}

Bil.prototype.brems = function () {
    if (this.hastighet > 10) {
        return this.hastighet -= 10;
    }
    else {
        return this.hastighet = 0;
    }
}

// OPPGAVE 4
function gassCar(id) {
    switch (id) {
        case "gassBtn1":
            car1.gass();
            break;
        case "gassBtn2":
            car2.gass();
            break;
        case "gassBtn3":
            car3.gass();
            break;
        default:
            null;
    }
    updateSpeedometer();
}

function breakCar(id) {
    switch (id) {
        case "breakBtn1":
            car1.brems();
            break;
        case "breakBtn2":
            car2.brems();
            break;
        case "breakBtn3":
            car3.brems();
            break;
        default:
            null;
    }
    updateSpeedometer();
}

// OPPGAVE 5
Bil.prototype.status = function() {
    return this.merke + ": " + this.hastighet + " km/t\n";
}

function updateSpeedometer() {
    document.getElementById("speedometer").innerText = car1.status() + car2.status() + car3.status();
}