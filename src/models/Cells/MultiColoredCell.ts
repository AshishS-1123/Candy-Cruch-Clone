import { CellType, Colors } from "~/setup";
import { Cell } from "./Cell";

import MULTICOLORED_CANDY from '~/images/SpecialCandies/Multicolored.png';
import { Global } from "~/EventBus";

export class MultiColoredCell implements Cell {
    cellType: CellType;
    colorType: Colors;
    image: HTMLImageElement;
    isVisible: boolean;

    constructor () {
        this.cellType = 'MULTICOLORED';
        this.colorType = 'NONE';
        this.isVisible = true;

        this.image = Global.spritePool.getMulticolored();
    }

    copy :() => Cell = () => {
        return new MultiColoredCell();
    }
}