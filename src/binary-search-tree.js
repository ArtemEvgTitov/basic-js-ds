const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    const newNode = new Node(data);
    if (!this.treeRoot) {
      this.treeRoot = newNode;
    } else {
      let current = this.treeRoot;
      while (true) {
        if (data < current.data) {
          if (!current.left) {
            current.left = newNode;
            break;
          }
          current = current.left;
        } else {
          if (!current.right) {
            current.right = newNode;
            break;
          }
          current = current.right;
        }
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let current = this.treeRoot;
    while (current) {
      if (data === current.data) return current;
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }

  remove(data) {
    this.treeRoot = this._removeNode(this.treeRoot, data);
  }

  _removeNode(node, data) {
    if (!node) return null;
    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    }
    if (data > node.data) {
      node.right = this._removeNode(node.right, data);
      return node;
    }
    if (!node.left) return node.right;
    if (!node.right) return node.left;

    let minRight = node.right;
    while (minRight.left) minRight = minRight.left;
    node.data = minRight.data;
    node.right = this._removeNode(node.right, minRight.data);
    return node;
  }

  min() {
    if (!this.treeRoot) return null;
    let current = this.treeRoot;
    while (current.left) current = current.left;
    return current.data;
  }

  max() {
    if (!this.treeRoot) return null;
    let current = this.treeRoot;
    while (current.right) current = current.right;
    return current.data;
  }
}

module.exports = {
  BinarySearchTree,
};
