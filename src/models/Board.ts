import { CellType, Colors, COLUMNS, ROWS } from "~/setup";
import { Cell } from "models/Cells/Cell";
import { CandySourceCell } from "./Cells/CandySourceCell";
import { generateRandomBoard } from "~/utils/boardGenerator";
import { Vector } from 'setup';
import EMPTY_CELL_IMG from '../images/EmptyCell.png';
import { EventBus } from "~/EventBus";

function createCandySourceCells(): CandySourceCell[] {
    const sourceCells: CandySourceCell[] = [];

    for (let i = 0; i < COLUMNS; ++i) {
        sourceCells[i] = new CandySourceCell();
    }

    return sourceCells;
}

export class Board {
    // Matrix of items that represents board state.
    cells: Cell[][];

    // These cells are used for generating new candies.
    // Instead of using an array of cells, we can just as easily use a single one,
    // However, in the future, we might have the need to generate special candies at 
    // certain locations. An array of source cells will be useful there.
    sourceCells: CandySourceCell[];

    constructor() {
        this.cells = generateRandomBoard();
        this.sourceCells = createCandySourceCells();

        console.log({ROWS, COLUMNS});
        
        this.printBoard();

        EventBus.updateBoard.add (this.onBoardUpdate.bind (this));
    }

    onBoardUpdate (board: Board): void {
        this.cells = board.cells;
        this.sourceCells = board.sourceCells;

        // EventBus.renderBoard.emit(this);
    }

    getImageAtCell (cellPos: Vector | null): HTMLImageElement {
        const emptyCellImage = new Image();
        emptyCellImage.src = EMPTY_CELL_IMG;

        if (!cellPos) return emptyCellImage;

        if (cellPos.x < 0 || cellPos.x >= ROWS || cellPos.y < 0 || cellPos.y >= COLUMNS) 
            return emptyCellImage;
        
        return this.cells[cellPos.x][cellPos.y].image;
    }

    getColorAtCell (cellPos: Vector | null): Colors {
        if (!cellPos) return 'EMPTY';

        if (cellPos.x < 0 || cellPos.x >= ROWS || cellPos.y < 0 || cellPos.y >= COLUMNS) 
            return 'EMPTY';

        return this.cells[cellPos.x][cellPos.y].colorType;
    }

    getTypeAtCell (cellPos: Vector | null): CellType {
        if (!cellPos) return 'NONE';

        if (cellPos.x < 0 || cellPos.x >= ROWS || cellPos.y < 0 || cellPos.y >= COLUMNS) 
            return 'NONE';

        return this.cells[cellPos.x][cellPos.y].cellType;
    }

    doCandiesMatch (first: Vector, second: Vector): boolean {
        if (this.getColorAtCell(first) === this.getColorAtCell(second)) {
            return true;
        }

        return false;
    }

    printBoard () {
        this.cells.forEach(row => {
            console.log(row.map(it => it.colorType[0]).toString());
        })
    }
}