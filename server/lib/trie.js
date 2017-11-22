
class Node {
  constructor(value) {
    this.value = value;
    this.eow = false;
    this.children = {};
  }
}

class Trie extends Node {
  constructor() {
    super(null);
  }

  add(word) {
    const addHelper = (node, str) => {
      if (!node.children[str[0]]) {
        node.children[str[0]] = new Node(str[0]);
        if (str.length === 1) {
          node.children[str[0]].eow = true;
        }
      }

      if (str.length > 1) {
        addHelper(node.children[str[0]], str.slice(1));
      }
    };

    addHelper(this, word);
  }

  search(prefix) {
    let result = [];

    const getRemainingTree = (str, node) => {

      while (str) {
        if (!node) {
          return false;
        }

        node = node.children[str[0]];
        str = str.substr(1);

        if (node && node.eow && !str) {
          result.push(prefix);
   
          if (node.children == {}) {
            return false;
          }
        }
      }
      return node;
    };
    
    const resultHelper = (str, tree) => {
      for (let k in tree.children) {
        const child = tree.children[k];
        var newStr = str + child.value;
        if (child.eow) {
          result.push(newStr);
        }
        resultHelper(newStr, child);
      }
    };

    let remainingTree = getRemainingTree(prefix, this);
    if (remainingTree) {
      resultHelper(prefix, remainingTree);
    }

    return result;  
  }
}

module.exports = new Trie();
