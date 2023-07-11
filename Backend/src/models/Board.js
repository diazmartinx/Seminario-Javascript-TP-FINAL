class Board{
    constructor(totalCells, player1, player2){
        this.totalCells = totalCells;
        this.player1 = player1;
        this.player2 = player2;
    }

    getPlayerbyId(id){
        if(this.player1.id == id){
            return this.player1;
        }else if(this.player2.id == id){
            return this.player2;
        }else{
            return null;
        }
    }
}

export default Board;