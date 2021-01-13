
/*  BASE CODE PROVIDED FROM LESSON  */
class Bubble {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = rgbToHex(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
    }

    move() {
        this.x = this.x + Math.floor(Math.random() * 10 - 5);
        this.y = this.y + Math.floor(Math.random() * 10 - 5);
    }

    display() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.stroke();
    }

    isHovering(xcoor, ycoor) {
        let a = xcoor - this.x;
        let b = ycoor - this.y;
        let distance = Math.sqrt(a ** 2 + b ** 2);

        if (distance < this.r) {
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
    let r = Math.floor(Math.random() * 40 + 10);
    bubbles[i] = new Bubble(x, y, r);
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
    return "#" + numberToHex(r) + numberToHex(g) + numberToHex(b);
}

// NB! Calling the functions in the constructor for Bubble in the base code