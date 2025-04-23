import { Tree, printTraversals, prettyPrint } from './tree.js';

// const numbers = Array.from({length: 30}, () => Math.floor(Math.random() * 20));
// console.log(numbers);

const numbers = [
    17, 17, 4, 19, 7, 11, 15, 16, 11,
    15, 15, 5, 18, 14, 1, 1, 6, 5,
    8, 14, 9, 7, 5, 7, 8, 1, 14,
    18, 6, 14
]
const tree = new Tree(numbers);
console.log(`Is balanced? ${tree.isBalanced()}`);

printTraversals(tree);

console.log("Adding numbers to unbalance...");
tree.insert(21);
tree.insert(50);
tree.insert(22);
tree.insert(65);
tree.insert(72);
tree.insert(10);

console.log(`Is balanced? ${tree.isBalanced()}`);

console.log("Rebalancing...");
tree.rebalance();

console.log(`Is balanced? ${tree.isBalanced()}`);

printTraversals(tree);

prettyPrint(tree.root);
