class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        /* Remove duplicates */
        array = [...new Set(array)];

        /* Sort */
        array = array.sort((a, b) => a - b);

        function build(array, start, end) {
            if (start > end)
                return null;
    
            const mid = Math.floor(start + (end - start) / 2)
    
            const root = new Node(array[mid]);
            root.left = build(array, start, mid - 1);
            root.right = build(array, mid + 1, end);
    
            return root;
        }

        /* Build tree and return root */
        return build(array, 0, array.length - 1)
    }

    insert(value) {
        function call (root, value) {
            if (root === null) {
                return new Node(value);
            }

            if (value < root.data)
                root.left = call(root.left, value);
            else if (value > root.data)
                root.right = call(root.right, value);

            return root;
        }

        call(this.root, value);
    }

    deleteItem(value) {
        function findSuccessor(root) {
            if(root.left === null) 
                return root; 
            
            return findSuccessor(root.left);
        }
        function call(root, value) {
            /* Base case */
            if(root === null) {
                return null;
            }

            /* Traverse */
            if(value < root.data)
                root.left = call(root.left, value);
            else if(value > root.data)
                root.right = call(root.right, value);
            else { /* Found the node */
                
                /* Case: Two children */
                if(root.left !== null && root.right !== null) {
                    const successor = findSuccessor(root.right);
                    root.data = successor.data;
                    root.right = call(root.right, successor.data);
                    return root;
                }

                /* Case: One child */
                if(root.left !== null)
                    return root.left;
                if(root.right !== null)
                    return root.right;


                /* Case: No child */
                if(root.left === null && root.right === null)
                    return null;

            }

            return root;
        }

        call(this.root, value);

    }

    find(value) {
        function call(root, value) {
            if (root === null)
                return null;
            if (root.data === value)
                return root;

            if(value < root.data)
                return call(root.left, value);
            else 
                return call(root.right, value);

        }

        return call(this.root, value);
    }
    
    levelOrder(callback) {
        if(typeof callback !== 'function')
            throw new Error("Callback must be a function.")

        const queue = [this.root];
        let currentNode = null;

        do {
            currentNode = queue.shift();
            callback(currentNode.data);

            if(currentNode.left !== null)
                queue.push(currentNode.left);
            if(currentNode.right !== null)
                queue.push(currentNode.right);
        } while(queue.length !== 0);
    }

    inOrder(callback) {
        if(typeof callback !== 'function')
            throw new Error("Callback must be a function.")

        function call(root) {
            if(root === null)
                return; 

            call(root.left);
            callback(root.data);
            call(root.right);
        }

        call(this.root);
    }

    preOrder(callback) {
        if(typeof callback !== 'function')
            throw new Error("Callback must be a function.")

        function call(root) {
            if(root === null)
                return; 

            callback(root.data);
            call(root.left);
            call(root.right);
        }

        call(this.root);
    }

    postOrder(callback) {
        if(typeof callback !== 'function')
            throw new Error("Callback must be a function.")

        function call(root) {
            if(root === null)
                return; 

            call(root.left);
            call(root.right);
            callback(root.data);
        }

        call(this.root);
    }

    height(value) {

        function call(root) {
            if(root === null)
                return 0;

            let left = call(root.left) + 1;
            let right = call(root.right) + 1;

            return Math.max(left, right);
        }

        const root = this.find(value);
        if(root === null)
            return null;

        return call(root) - 1;
    }

    depth(value) {
        function call(root) {
            if(root === null)
                return 0;
            
            let left = 0;
            let right = 0;
            if(value < root.data) {
                left = call(root.left) + 1;
            }
            else if(value > root.data) {
                right = call(root.right) + 1;
            }

            return Math.max(left, right);
        }

        if(this.find(value) === null)
            return null;

        return call(this.root);
    }

    isBalanced() {
        /* Use levelOrder and run the height() function on each */
        /* Use iterative */

        const queue = [this.root];
        let currentNode = null;

        do {
            currentNode = queue.shift();
            
            const heightLeft = currentNode.left !== null 
                ? this.height(currentNode.left.data)
                : 0;
            const heightRight = currentNode.right !== null 
                ? this.height(currentNode.right.data)
                : 0;
            const diff = Math.abs(heightLeft - heightRight);

            if(diff > 1) 
                return false;

            if(currentNode.left !== null)
                queue.push(currentNode.left);
            if(currentNode.right !== null)
                queue.push(currentNode.right);
        } while(queue.length !== 0);

        return true;
    }

    rebalance() {
        if(!this.isBalanced()) {
            const arr = [];
            this.inOrder(
                (item) => arr.push(item)
            );
            console.log(arr);
            this.root = this.buildTree(arr);
        }
    }
}

function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const tree = new Tree([6, 3, 2, 1, 4, 5]);
// prettyPrint(tree.root);
tree.insert(16);
tree.insert(9);
prettyPrint(tree.root);
console.log("===============");
// tree.postOrder((item) => console.log(item));
// console.log(tree.depth(16));
// console.log(tree.isBalanced())
tree.rebalance();
prettyPrint(tree.root);
// tree.deleteItem(16);
// prettyPrint(tree.root);
// console.log(tree.find(151));
// console.log(tree.find(5));