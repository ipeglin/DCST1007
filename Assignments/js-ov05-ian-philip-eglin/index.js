
// OPPGAVE 1

let mountainData = [
    {
        "county_name": "Akershus",
        "summit_name": "Fjellsjøkampen",
        "altitude": 812
    },
    {
        "county_name": "Aust-Agder",
        "summit_name": "Sæbyggjenuten",
        "altitude": 1507
    },
    {
        "county_name": "Buskerud",
        "summit_name": "Folarskardnuten",
        "altitude": 1933
    },
    {
        "county_name": "Finnmark",
        "summit_name": "Øksfjordjøkelen",
        "altitude": 1191
    },
    {
        "county_name": "Hedmark",
        "summit_name": "Rondslottet",
        "altitude": 2178
    },
    {
        "county_name": "Hordaland",
        "summit_name": "Hardangerjøkulen",
        "altitude": 1861
    },
    {
        "county_name": "Møre og Romsdal",
        "summit_name": "Pyttegga",
        "altitude": 1999
    },
    {
        "county_name": "Nord-Trøndelag",
        "summit_name": "Jetnamsklumpen",
        "altitude": 1512
    },
    {
        "county_name": "Nordland",
        "summit_name": "Oksskolten",
        "altitude": 1915
    },
    {
        "county_name": "Oppland",
        "summit_name": "Galdhøpiggen",
        "altitude": 2469
    },
    {
        "county_name": "Oslo",
        "summit_name": "Kjerkeberget",
        "altitude": 630
    },
    {
        "county_name": "Rogaland",
        "summit_name": "Vassdalseggi",
        "altitude": 1658
    },
    {
        "county_name": "Sogn og Fjordane",
        "summit_name": "Store Skagastølstinden",
        "altitude": 2405
    },
    {
        "county_name": "Sør-Trøndelag",
        "summit_name": "Storskrymten",
        "altitude": 1985
    },
    {
        "county_name": "Telemark",
        "summit_name": "Gaustatoppen",
        "altitude": 1883
    },
    {
        "county_name": "Troms",
        "summit_name": "Jiehkkevári",
        "altitude": 1834
    },
    {
        "county_name": "Vest-Agder",
        "summit_name": "Urdalsknuten",
        "altitude": 1433
    },
    {
        "county_name": "Vestfold",
        "summit_name": "Vestfjellet",
        "altitude": 634
    },
    {
        "county_name": "Østfold",
        "summit_name": "Slavasshøgda",
        "altitude": 336
    }
];

let mountainText = JSON.stringify(mountainData);
localStorage.setItem("fylkestopper.json", mountainText)



// OPPGAVE 2

// Importing the data from the local storage
let jsonData = localStorage.getItem("fylkestopper.json");
// Parsing the data so it is readable
let data = JSON.parse(jsonData);

// Creating the HTML text for the table element
let tableElement = "<table id='summit-table'><tr><th>Fylke</th><th>Fjelltopp</th><th>Høyde</th>";
// For every county in the JSON database. List the following data in HTML
for (let county of data) {
    tableElement += `<tr><td>${county.county_name}</td><td>${county.summit_name}</td><td>${county.altitude}</tr>`;
}
tableElement += "</table>"

// Adding the table HTML text to the table holder div
document.getElementById("tableHolder").innerHTML = tableElement;


// What is this? CSS styling in JS. Yuck! Disgusting!

// Creating outer border for the table element
document.getElementById("summit-table").style.border = "2px solid black";
// Aligning the table headers to the left of the column
for (let element of document.getElementsByTagName("th")) {
    element.style.textAlign = "left";
}
// Adding padding to all table data elements and a thin border that makes the data easier to read
for (let element of document.getElementsByTagName("td")) {
    element.style.paddingRight = "2em";
    element.style.borderTop = "1px solid black";
}



// OPPGAVE 3


// SLUTT



// OPPGAVE 4

