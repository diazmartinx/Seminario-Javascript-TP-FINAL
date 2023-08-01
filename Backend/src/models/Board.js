class Board {
  constructor(totalCells, player1, player2) {
    this.totalCells = totalCells;
    this.player1 = player1;
    this.player2 = player2;
  }

  getPlayerbyId(id) {
    if (this.player1.id == id) {
      return this.player1;
    } else if (this.player2.id == id) {
      return this.player2;
    } else {
      return null;
    }
  }

  getDetails() {
    return {
      player1: {
        nombre: this.player1.name,
        color: this.player1.color,
        position: this.player1.position,
      },
      player2: {
        nombre: this.player2.name,
        color: this.player2.color,
        position: this.player2.position,
      },
      totalCells: this.totalCells,
    };
  }
}

export default Board;
