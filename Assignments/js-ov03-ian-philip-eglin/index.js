
/*  BASE CODE PROVIDED FROM LESSON  */
class Bubble {
    constructor(x, y, rad) {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.color = rgbToHex(r, g, b);
        this.originalColor = rgbToHex(r, g, b);
    }

    move() {
        this.x = this.x + Math.floor(Math.random() * 10 - 5);
        this.y = this.y + Math.floor(Math.random() * 10 - 5);
        if (this.x >= (canvas.width - this.rad)) {
            this.x = this.x - 5;
        }
        if (this.x <= this.rad) {
            this.x = this.x + 5;
        }
    }

    display() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.stroke();
    }

    isHovering(xcoor, ycoor) {
        let a = xcoor - this.x;
        let b = ycoor - this.y;
        let distance = Math.sqrt(a ** 2 + b ** 2);

        if (distance < this.rad) {
            return true;
        }
        else {
            return false;
        }
    }
}

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.addEventListener("mousedown", mouseClick, false);
canvas.addEventListener("mousemove", mouseMove, false);

let bubbles = [];

for (let i = 0; i < 10; i++) {
    let x = Math.floor(Math.random() * canvas.width);
    let y = Math.floor(Math.random() * canvas.height);
    let rad = Math.floor(Math.random() * 40 + 10);
    bubbles[i] = new Bubble(x, y, rad);
}

setInterval(draw, 100);

function draw() {
    reset();
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].move();
        bubbles[i].display();
    }
}

function reset() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function mouseClick(event) {
    let isOverBubble = false;
    for (let i = 0; i < bubbles.length; i++) {
        if (bubbles[i].isHovering(event.x, event.y)) {
            bubbles.splice(i, 1);
            isOverBubble = true;
        }
    }

    if (isOverBubble == false) {
        let r = Math.floor(Math.random() * 40 + 10);
        let b = new Bubble(event.x, event.y, r);
        bubbles.push(b);
    }
}

function mouseMove(event) {
    for (let i = 0; i < bubbles.length; i++) {
        if (bubbles[i].isHovering(event.x, event.y)) {
            bubbles[i].color = "red";
        }
        else {
            bubbles[i].color = bubbles[i].originalColor;
        }
    }
}
/*  END OF BASE CODE  */


// OPPGAVE 1

// Function to convert decimal integers to hexadecimal numbers
function numberToHex(n) {
    let h = n.toString(16);
    return h.length == 1 ? "0" + h : h;
}

// Function to convert RGB values to an hexadecimal color code
function rgbToHex(r, g, b) {
    hex = "#" + numberToHex(r) + numberToHex(g) + numberToHex(b);
    return hex;
}


// NB! Calling the functions in the constructor for Bubble in the base code
// This is also true for the function making the bubbles return to their previous colour



// OPPGAVE 2

// The BUBBLE CREATOR!!!
setInterval(() => {
    let newx = Math.floor(Math.random() * canvas.width);
    let newy = Math.floor(Math.random() * canvas.height);
    let newr = Math.floor(Math.random() * 40 + 10);
    bubbles.push(new Bubble(newx, newy, newr))
}, 1000);



// OPPGAVE 3
