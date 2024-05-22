
class Circle {
  // # indicates a private property
  #radius: number;
  #color: string;
  
  
  // NB! not possible to have multiple constructors
  // Instead, setting default values for the parameters
  constructor(radius: number = 1, color = 'red') {
    this.#radius = radius;
    this.#color = color;
  }

  // using getters and setters instead of getRadius() and setRadius(). see: https://www.javascripttutorial.net/javascript-getters-and-setters/
  get radius(): number {
    return this.#radius;
  }

  get area(): number {
    const area = Math.PI * this.#radius ** 2;
    return this.roundToDecimals(area);
  }

  get circumference(): number {
    const circumference = 2 * Math.PI * this.#radius;
    return this.roundToDecimals(circumference);
  }

  // correctly round to two decimals even for 1.005. 
  // don't mind the espilon, you cound swap out all of this with .toFixed(2) instead
  roundToDecimals(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100
  }
}

// creating instances
const circle1: Circle = new Circle();
const circle2: Circle = new Circle(2);

// logging to console using template litterals
console.log(`Sirkelen har en radius på ${circle1.radius}, et areal på ${circle1.area} og en omkrets på ${circle1.circumference}".`)
console.log(`Sirkelen har en radius på ${circle2.radius}, et areal på ${circle2.area} og en omkrets på ${circle2.circumference}".`)

class Cube {
  #side: number;

  // passing circle object, and settings its area as cube side length
  constructor(circle: Circle) {
    const circleArea = circle.area;
    this.#side = Math.sqrt(circleArea);
  }
}