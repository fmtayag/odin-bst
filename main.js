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
        function _insert (root, value) {
            if (root === null) {
                return new Node(value);
            }

            if (value < root.data)
                root.left = _insert(root.left, value);
            else if (value > root.data)
                root.right = _insert(root.right, value);

            return root;
        }

        _insert(this.root, value);
    }

    deleteItem(value) {
        function _delete(root, value) {
            /* Base case */
            if(root === null) {
                return null;
            }

            /* Traverse */
            if(value < root.data)
                root.left = _delete(root.left, value);
            else if(value > root.data)
                root.right = _delete(root.right, value);
            else { /* Found the node */
                /* Case 1: No child */
                if(root.left === null && root.right === null)
                    return null;

                /* Case 2: One child */
                if(root.left !== null)
                    return root.left;
                if(root.right !== null)
                    return root.right;

                /* Case 3: Two children */

            }

            return root;
        }

        _delete(this.root, value);

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
tree.insert(16);
tree.insert(9);
prettyPrint(tree.root);
tree.deleteItem(6);
prettyPrint(tree.root);
