import { Cell } from "~/models/Cells/Cell";
import { Colors, COLUMNS, ROWS } from "~/setup";
import { SimpleCell } from "~/models/Cells/SimpleCell";
import { SimpleCandy } from "~/models/CellItems/Candies/SimpleCandy";

function compareCells (cell_1: Cell, cell_2: Cell): boolean {
    return (cell_1.cellItem?.image.src == cell_2.cellItem?.image.src);
}

function selectRandomString (possibilities: string[], exceptions: string[] = []) {
    while (1) {
        const choice = possibilities[ Math.floor (Math.random() * possibilities.length) ];

        if (!exceptions.find (element => element === choice)) return choice;
    }
}

export function generateRandomBoard (): Cell[][] {
    const cells: Cell[][] = [];

    const choices = ['RED', 'ORANGE', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'EMPTY']

    for (let i = 0; i < ROWS; ++i) {
        cells[i] = [];

        for (let j = 0; j < COLUMNS; ++j) {
            cells[i][j] = new SimpleCell(selectRandomString(choices) as Colors);
        }
    }

    // Go through all rows and remove any elements that appear thrice in row.
    for (let i = 0; i < ROWS; ++i) {
        for (let j = 0; j < COLUMNS - 3; ++j) {
            if (compareCells(cells[i][j], cells[i][j+1]) && compareCells(cells[i][j], cells[i][j+2])) {
                // Cells (i,j) (i,j+1) and (i,j+2) are in line
                // mark the middle cell as some different color.
                cells[i][j+1] = new SimpleCell (selectRandomString(choices, [(cells[i][j].cellItem as SimpleCandy).color]) as Colors);
            }
        }
    }

    // Go through all columns and remove elements that appear thrice in column.
    for (let i = 0; i < COLUMNS; ++i) {
        for (let j = 0; j < ROWS - 3; ++j) {
            if (compareCells(cells[j][i], cells[j+1][i]) && compareCells(cells[j][i], cells[j+2][i])) {
                // Cells (j,i) (j+1,i) and (j+2,i) are in line
                // mark the middle cell as some different color.
                cells[j+1][i] = new SimpleCell (selectRandomString(choices, [(cells[j][i].cellItem as SimpleCandy).color]) as Colors);
            }
        }
    }

    return cells;
}