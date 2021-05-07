class Cell {
    index: number;
    richness: number;
    neighbors: [number, number, number, number, number, number];

    constructor(
        index: number,
        richness: number,
        neighbors: [number, number, number, number, number, number]
    ) {
        this.index = index;
        this.richness = richness;
        this.neighbors = neighbors;
    }
}

class Tree {
    cellIndex: number;
    size: number;
    isMine: boolean;
    isDormant: boolean;

    constructor(
        cellIndex: number,
        size: number,
        isMine: boolean,
        isDormant: boolean
    ) {
        this.cellIndex = cellIndex;
        this.size = size;
        this.isMine = isMine;
        this.isDormant = isDormant;
    }
}

const WAIT = 'WAIT';
const SEED = 'SEED';
const GROW = 'GROW';
const COMPLETE = 'COMPLETE';

type ACTION_TYPES = typeof WAIT | typeof SEED | typeof GROW | typeof COMPLETE;

class Action {
    type: ACTION_TYPES;
    targetCellIdx: number;
    sourceCellIdx: number;

    constructor(type: typeof WAIT);

    constructor(
        type: typeof SEED,
        targetCellIdx: number,
        sourceCellIdx: number
    );

    constructor(type: typeof GROW | typeof COMPLETE, targetCellIdx: number);

    constructor(type: string, targetCellIdx?: number, sourceCellIdx?: number);

    constructor(
        type: ACTION_TYPES,
        targetCellIdx?: number,
        sourceCellIdx?: number
    ) {
        this.type = type;
        this.targetCellIdx = targetCellIdx;
        this.sourceCellIdx = sourceCellIdx;
    }

    static parse(line: string) {
        const parts = line.split(' ');

        switch(parts[0]) {
            case WAIT:
                return new Action(WAIT);

            case SEED:
                return new Action(SEED, parseInt(parts[2]), parseInt(parts[1]));

            default:
                return new Action(parts[0], parseInt(parts[1]));
        }
    }

    toString() {
        if (this.type === WAIT) {
            return WAIT;
        }

        if (this.type === SEED) {
            return `${SEED} ${this.sourceCellIdx} ${this.targetCellIdx}`;
        }

        return `${this.type} ${this.targetCellIdx}`;
    }
}

class Game {
    round: number;
    nutrients: number;
    cells: Cell[];
    possibleActions: Action[];
    trees: Tree[];
    mySun: number;
    myScore: number;
    opponentsSun: number;
    opponentScore: number;
    opponentIsWaiting: boolean;

    day: number;
    opponentSun: number;

    constructor() {
        this.round = 0;
        this.nutrients = 0;
        this.cells = [];
        this.possibleActions = [];
        this.trees = [];
        this.mySun = 0;
        this.myScore = 0;
        this.opponentsSun = 0;
        this.opponentScore = 0;
        this.opponentIsWaiting = false;
    }

    getNextAction(): Action {
        // TODO: write your algorithm here
        const myTrees = getSortedTree();

        // Si j'ai plus assez de soleil pour completer le cycle d'un arbre je WAIT
        if(game.mySun < 4) {
            return this.possibleActions[0];
        }

        // Si j'ai assez de soleil
        // je depile ma list d'arbre
        return new Action(COMPLETE, myTrees.pop().cellIndex);
    }
}

function getSortedTree(): Array<Tree> {

    let myTrees: Array<Tree>  = [];

    // Récupérer tout mes arbres (uniquement les arbres de taille 3 pour l'instant (Ligue Bois 2))
    game.trees.forEach((tree) => {
        if(tree.isMine && tree.size === 3) {
            myTrees.push(tree);
        }
    });

    // Les trier en fonction de ce qu'ils me rapportent
    myTrees.sort((treeA, treeB) => {
        const treeRichnessA = game.cells[treeA.cellIndex].richness;
        const treeRichnessB = game.cells[treeB.cellIndex].richness;
        
        switch(true) {
            case treeRichnessA > treeRichnessB:
                return 1;
            case treeRichnessA < treeRichnessB:
                return -1;
            default:
                return 0;
        }
    });

    return myTrees;
}







const game = new Game();

const numberOfCells = parseInt(readline());

for (let i = 0; i < numberOfCells; i++) {
    var inputs = readline().split(' ');
    const index = parseInt(inputs[0]);
    const richness = parseInt(inputs[1]);
    const neigh0 = parseInt(inputs[2]);
    const neigh1 = parseInt(inputs[3]);
    const neigh2 = parseInt(inputs[4]);
    const neigh3 = parseInt(inputs[5]);
    const neigh4 = parseInt(inputs[6]);
    const neigh5 = parseInt(inputs[7]);

    game.cells.push(
        new Cell(index, richness, [
            neigh0,
            neigh1,
            neigh2,
            neigh3,
            neigh4,
            neigh5,
        ])
    );
}

while (true) {
    game.day = parseInt(readline());
    game.nutrients = parseInt(readline());
    var inputs = readline().split(' ');
    game.mySun = parseInt(inputs[0]);
    game.myScore = parseInt(inputs[1]);
    var inputs = readline().split(' ');
    game.opponentSun = parseInt(inputs[0]);
    game.opponentScore = parseInt(inputs[1]);
    game.opponentIsWaiting = inputs[2] !== '0';
    game.trees = [];

    const numberOfTrees = parseInt(readline());

    for (let i = 0; i < numberOfTrees; i++) {
        var inputs = readline().split(' ');
        const cellIndex = parseInt(inputs[0]);
        const size = parseInt(inputs[1]);
        const isMine = inputs[2] !== '0';
        const isDormant = inputs[3] !== '0';

        game.trees.push(new Tree(cellIndex, size, isMine, isDormant));
    }

    game.possibleActions = [];
    const numberOfPossibleAction = parseInt(readline());

    for (let i = 0; i < numberOfPossibleAction; i++) {
        const possibleAction = readline();
        game.possibleActions.push(Action.parse(possibleAction));
    }

    const action = game.getNextAction();

    console.log(action.toString());
}
