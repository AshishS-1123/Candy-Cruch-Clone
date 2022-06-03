import { Vector } from 'setup';
import { EventBus } from '~/EventBus';
import { Board } from '~/models/Board';
import { CanvasView } from '~/views/CanvasView';

// Based on events, swap candies, check if they match and destroy them.
export class SwapHandler {
    private board: Board;
    private firstSelectedCell: Vector | null;
    private secondSelectedCell: Vector | null;

    constructor(board: Board) {
        this.board = board;

        this.firstSelectedCell = null;
        this.secondSelectedCell = null;

        EventBus.cellClickEvent.add (this.handleCellClicked.bind (this));
    }

    handleCellClicked (pos: Vector): void {
        const { x: pos_x, y: pos_y } = pos;

        if (!this.firstSelectedCell) {
            this.firstSelectedCell = {x: pos_x, y: pos_y};
        } else if (!this.secondSelectedCell) {
            console.log("Click second");
            
            this.secondSelectedCell = {x: pos_x, y: pos_y};

            // The two cells that are being swapped should be adjacent.
            if (
                Math.abs (this.firstSelectedCell.x - this.secondSelectedCell.x) !== 1 &&
                Math.abs (this.firstSelectedCell.y - this.secondSelectedCell.y) !== 1
            ) {
                this.firstSelectedCell = this.secondSelectedCell = null;
                return;
            }

            // Render this on canvas.
            EventBus.renderSwapAnimation.emit ({
                first: {
                    pos: this.secondSelectedCell || {x: -1, y: -1},
                    img: this.board.getImageAtCell (this.firstSelectedCell)
                },
                second: {
                    pos: this.firstSelectedCell || {x: -1, y: -1},
                    img: this.board.getImageAtCell (this.secondSelectedCell)
                },
            });

            // Reset selection after swapping.
            this.firstSelectedCell = null;
            this.secondSelectedCell = null;
        }

    }
}