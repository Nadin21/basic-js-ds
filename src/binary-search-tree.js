const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootTree = null;
  }

  root() {
    return this.rootTree;
  }

  add(data) {
    this.rootTree = addNode(this.rootTree, data);

    function addNode(node, data) {

      if (!node) return new Node(data);

      if (node.data === data) return node;

      if (data < node.data) {
        node.left = addNode(node.left, data);
      } else {
        node.right = addNode(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return searchData(this.rootTree, data);

    function searchData(node, data) {

      if (!node) return false;

      if (node.data === data) return true;

      if (data < node.data) return searchData(node.left, data);
      else return searchData(node.right, data);
    }
  }

  find(data) {
    return searchNode(this.rootTree, data);

    function searchNode(node, data) {
      if (!node) return null;

      if (node.data === data) return node;

      if (data < node.data) return searchNode(node.left, data);
      else return searchNode(node.right, data);
    }
  }

  remove(data) {
    this.rootTree = deleteNode(this.rootTree, data);

    function deleteNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = deleteNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = deleteNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let maxLeftBranch = node.left;
        while (maxLeftBranch.right) {
          maxLeftBranch = maxLeftBranch.right;
        }
        node.data = maxLeftBranch.data;

        node.left = deleteNode(node.left, maxLeftBranch.data);

        return node;
      }
    }
  }

  min() {
    if (!this.rootTree) return;

    let min = this.rootTree;
    while (min.left) {
      min = min.left;
    }

    return min.data;
  }

  max() {
    if (!this.rootTree) return;

    let max = this.rootTree;
    while (max.right) {
      max = max.right;
    }

    return max.data;
  }
}

module.exports = {
  BinarySearchTree
};