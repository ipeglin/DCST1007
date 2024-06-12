
class Piece {
  #position: (string|number)[]; // storing position as array of [letter, number]
  #color: string;

  // creating a constructor for a chess piece
  constructor(position: (string|number)[], color: string) {
    this.#position = position;
    this.#color = color;
  }
}

class King extends Piece {
  constructor(position: (string|number)[], color: string) {
    super(position, color); // using the constructor from the parent class
  }
}
class Queen extends Piece {
  constructor(position: (string|number)[], color: string) {
    super(position, color); // using the constructor from the parent class
  }
}
class Rook extends Piece {
  constructor(position: (string|number)[], color: string) {
    super(position, color); // using the constructor from the parent class
  }
}
class Bishop extends Piece { } // same as above
class Knight extends Piece { } // same as above
class Pawn extends Piece { } // same as above

// array for holding all pieces on the board
// NB! note that the array is a const, but due to
// Javascript/TypeScript being a garbage language, we can still push to it
const pieces: Piece[] = [];

const colors: string[] = ['white', 'black'];
const horisontalPositions: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// creating instances of the chess pieces
// looping over the colors to create pieces for both white and black
for (let color in colors) {
  // get the row number for pawns and other pieces depending on color
  const [pawnRow, outerRow] = (color === 'white') ? [1, 2] : [7, 8];

  // copy + paste of solution. it is tedious to write, but can't be bothered to 'optimisme'
  pieces.push(new Rook(['A', outerRow], color));
  pieces.push(new Knight(['B', outerRow], color));
  pieces.push(new Bishop(['C', outerRow], color));
  pieces.push(new King(['D', outerRow], color));
  pieces.push(new Queen(['E', outerRow], color));
  pieces.push(new Bishop(['F', outerRow], color));
  pieces.push(new Knight(['G', outerRow], color));
  pieces.push(new Rook(['H', outerRow], color));

  // creating pawns
  for (let position in horisontalPositions) {
    pieces.push(new Pawn([position, pawnRow], color));
  }
}
