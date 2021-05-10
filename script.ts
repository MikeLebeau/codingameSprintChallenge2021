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

const GROW_TO_TWO_COST = 3;
const GROW_TO_THREE_COST = 7;
const COMPLETE_COST = 4;

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
        
        // Ligue Bois 2
        // const myTrees = getSortedTree(game.trees);

        // Ligue Bois 1
        const myTrees = getSortedTreeByValue(game.trees, game.nutrients);

        // Si j'ai plus assez de soleil pour completer le cycle d'un arbre je WAIT
        if(game.mySun < COMPLETE_COST) {
            return this.possibleActions[0];
        }

        // Si j'ai assez de soleil
        // je depile ma list d'arbre
        const bestTree = myTrees.pop();

        return bestTree.size === 3 
            ? new Action(COMPLETE, bestTree.cellIndex)
            : new Action(GROW, bestTree.cellIndex);
            
    }
}

// La valeur d'un arbre => combien il va me rapporter par rapport a combien il va me couter
function calculateTreeValue(tree: Tree, nutrient: number): number {

    const score = game.cells[tree.cellIndex].richness + nutrient;
    let cost = 0;

    switch(tree.size){
        case 3:
            cost = COMPLETE_COST;
            break;
        case 2:
            cost = GROW_TO_THREE_COST + game.trees.filter((tree) => tree.size === 3).length;
            break;
        case 1:
            cost = GROW_TO_TWO_COST + game.trees.filter((tree) => tree.size === 2).length + GROW_TO_THREE_COST + game.trees.filter((tree) => tree.size === 3).length;
            break;
        default:
            console.log('Tree size bug');
    } 

    return score/cost;
}

function getMyTrees(trees: Array<Tree>): Array<Tree> {
    let myTrees: Array<Tree>  = [];
    
    game.trees.forEach((tree) => {
        if(tree.isMine) {
            myTrees.push(tree);
        }
    });

    return myTrees;
}

function getSortedTreeByValue(gameTrees: Array<Tree>, nutrient: number): Array<Tree> {

    let myTrees: Array<Tree>  = getMyTrees(gameTrees);

    myTrees.sort((treeA, treeB) => {
        switch(true) {
            case calculateTreeValue(treeA, nutrient) > calculateTreeValue(treeB, nutrient):
                return +1;
            case calculateTreeValue(treeA, nutrient) < calculateTreeValue(treeB, nutrient):
                return -1;
            default:
                return 0;
        }
    });

    return myTrees;
}

function getSortedTree(gameTrees: Array<Tree>): Array<Tree> {

    let myTrees: Array<Tree>  = getMyTrees(gameTrees);

    // Les trier en fonction de ce qu'ils me rapportent
    return myTrees.sort((treeA, treeB) => {
        const treeRichnessA = game.cells[treeA.cellIndex].richness;
        const treeRichnessB = game.cells[treeB.cellIndex].richness;

        if(treeA.size === treeB.size) {
            switch(true) {
                case treeRichnessA > treeRichnessB:
                    return 1;
                case treeRichnessA < treeRichnessB:
                    return -1;
                default:
                    return 0;
            }
        }
    });
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

function readline(): string {
    throw new Error("Function not implemented.");
}
