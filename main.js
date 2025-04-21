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
        array = array.sort();

        /* Build tree and return root */
        return this.build(array, 0, array.length - 1)
    }

    build(array, start, end) {
        if (start > end)
            return null;

        const mid = Math.floor(start + (end - start) / 2)

        const root = new Node(array[mid]);
        root.left = this.build(array, start, mid - 1);
        root.right = this.build(array, mid + 1, end);

        return root;
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
prettyPrint(tree.root);