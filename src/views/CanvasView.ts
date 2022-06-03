import { EventBus } from "~/EventBus";
import { Board } from "~/models/Board";
import { BOARD_HEIGHT, BOARD_WIDTH, CELL_HEIGHT, CELL_PADDING, CELL_WIDTH, COLUMNS, ROWS } from "~/setup";
import EMPTY_CELL from '../images/EmptyCell.png';
import { SwapAnimationView } from "./SwapAnimationView";

export class CanvasView {
    canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;

    private swapAnimation: SwapAnimationView;

    constructor(canvasName: string) {
        this.canvas = document.getElementById(canvasName) as HTMLCanvasElement;
        this.canvas.width = BOARD_WIDTH;
        this.canvas.height = BOARD_HEIGHT;
        this.context = this.canvas.getContext('2d');

        this.swapAnimation = new SwapAnimationView(this.context);
    }

    clearCanvas() {
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBoard(board: Board) {
        this.context?.resetTransform();
        this.context?.translate(CELL_PADDING, CELL_PADDING);
        this.clearCanvas();

        const emptyCellImage = new Image();
        emptyCellImage.src = EMPTY_CELL;

        // Draw all the cells.
        for(let i = 0; i < COLUMNS; ++i) {
            for (let j = 0; j < ROWS; ++j) {
                
                const x = (CELL_PADDING + CELL_WIDTH) * i;
                const y = (CELL_PADDING + CELL_HEIGHT) * j;

                this.context?.drawImage(
                    board.cells[j][i].cellItem?.image || emptyCellImage, 
                    x, 
                    y, 
                    CELL_WIDTH + 2 * CELL_PADDING, 
                    CELL_HEIGHT + 2 * CELL_PADDING
                );                
            }
        }
    }

    cellClicked (pos_x: number, pos_y: number) {
        this.context?.beginPath();
        this.context?.rect(
            CELL_PADDING + pos_x * (CELL_PADDING + CELL_WIDTH),
            CELL_PADDING + pos_y * (CELL_PADDING + CELL_HEIGHT),
            CELL_WIDTH,
            CELL_HEIGHT
        );
        this.context?.fill();
        console.log("Clicked ", pos_x, pos_y);
        
    }
}