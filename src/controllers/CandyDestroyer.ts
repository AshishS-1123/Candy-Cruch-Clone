import { EventBus } from "~/EventBus";
import { Vector } from "~/setup";
import { Board } from "~/models/Board";
import { SimpleCell } from "~/models/Cells/SimpleCell";

export class CandyDestroyer {
    constructor() {
        EventBus.destroyCandies.add (this.handleDestroyCandies);
    }

    handleDestroyCandies(params: {board: Board, candies: Vector[]}): void {
        const {board, candies} = params;
        
        candies.forEach(candy => {
            board.cells[candy.x][candy.y] = new SimpleCell('EMPTY');
        });

        // Update the global board object.
        EventBus.updateBoard.emit (board);

        // Apply gravity to board.
        EventBus.applyGravity.emit ();

        // Redraw the canvas.
        EventBus.renderBoard.emit (board);
    }
}