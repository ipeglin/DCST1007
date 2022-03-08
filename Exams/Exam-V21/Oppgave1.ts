/* Jeg valgte å skrive koden i TypeScript slik at jeg kan dra nytte av den statiske typesjekkingen.
Dette gjør koden mer oversiktlig, og det blir lettere for "debugging" siden man ser om variabler har type-feil.
Jeg har kalt variablene etter det ønskede navnet på norsk siden dette ble etterspurt.
Siden jeg personlig foretrekker å programmere alt på engelsk er derfor bl.a. metodene skrevet på engelsk også.
*/

// Defining the class for a vehicle
class Kjoretoy {
    // Declaring private variables according to task
    #maksHastighet: number;
    #kjorelengde: number;
    #farge: string = "hvit";

    constructor(speedLimit: number, distance: number) {
        this.#maksHastighet = speedLimit;
        this.#kjorelengde = distance;
    }

    get speedLimit() {
        return this.#maksHastighet;
    }

    get distance() {
        return this.#kjorelengde;
    }
}

// Creating an instance "car" for the vehicle class
const car: Kjoretoy = new Kjoretoy(160, 100);

// Logging information about the vehicle to the console 
console.log(`Kjøretøyet har en maksimal hastighet på ${car.speedLimit}km/t og kjører en distanse på ${car.distance}km`);


// Defining the "sub-class" Buss which inherits properties from Kjoretoy
class Buss extends Kjoretoy {
    // Declaring private variable for class
    #maksPassasjerer: number;

    constructor(maksHastighet: number, kjorelengde: number, passangerLimit: number) {
        super(maksHastighet, kjorelengde);
        this.#maksPassasjerer = passangerLimit;
    }

    sjekkAntall(antallpassasjerer) {
        return (antallpassasjerer > this.#maksPassasjerer) ? true : false;
    }

    getRentalPrice() {
        return (this.#maksPassasjerer * 100) * 1.25;
    }
}

// Creating an instance "bus" for the Buss class
const bus: Buss = new Buss(120, 300, 60);

// Using the defined method to check if 50 passangers is too many for this particular bus
console.log(`Vil 50 passasjerer være for mange for bussens kapasitet? ${bus.sjekkAntall(50)}`);

// Using the method getRentalPrice() to find the correct price for renting this particular bus
console.log(`Pris for leie av bussen vil komme på ${bus.getRentalPrice()}kr`);
