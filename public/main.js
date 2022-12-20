class Node {
    constructor(name, type) {
      this.name = name;
      this.type = type;
      this.children = [];
    }
  }
  
  class Tree {

    constructor() {

      this.root = null;
    }
  
    addNode(name, type, parentNode) {
      // create a new Node with the given name and type
      const newNode = new Node(name, type);
  
      // if the parentNode is not provided, add the new Node as a child of the root
      if (!parentNode) {
        if (!this.root) {
          this.root = newNode;
        } else {
          this.root.children.push(newNode);
        }
      } else {
        // otherwise, add the new Node as a child of the given parent Node
        parentNode.children.push(newNode);
      } 
    }
  
    deleteNode(node) {
      // find the parent Node of the node to be deleted
      const parentNode = this.findParent(node);
  
      // if the parentNode is not found, the node is not in the tree
      if (!parentNode) {
        return;
      }
  
      // find the index of the node to be deleted within the parent's children array
      const index = parentNode.children.indexOf(node);
  
      // if the index is not found, the node is not a child of the parent
      if (index === -1) {
        return;
      }
  
      // remove the node from the parent's children array
      parentNode.children.splice(index, 1);
    }
  
    findNode(name) {
      // start the search at the root Node
      return this.findRecursive(name, this.root);
    }
  
    findRecursive(name, node) {
        // if the current node matches the name, return it
        if (node.name === name) {
          return node;
        }
    
        // search through the children of the current node
        for (const child of node.children) {
          const foundNode = this.findRecursive(name, child);
          if (foundNode) {
            return foundNode;
          }
        }
    
        // if no match is found, return null
        return null;
      }
    
      findParent(node) {
        // start the search at the root Node
        return this.findParentRecursive(node, this.root, null);
      }
    
      findParentRecursive(node, currentNode, parentNode) {
        // if the current node matches the node we're searching for, return the parent
        if (currentNode === node) {
          return parentNode;
        }
    
        // search through the children of the current node
        for (const child of currentNode.children) {
          const foundParent = this.findParentRecursive(node, child, currentNode);
          if (foundParent) {
            return foundParent;
          }
        }
        // if no match is found, return null
        return null;
      }
      
    }
    // Helper functions
    function printTree(node) {
      console.log(node.name + " (" + node.type + ")");
      for (const child of node.children) {
        printTree(child);
      }
    }



// Make tree
System = new Tree();
System.addNode("User", "User") //ROOT NODE
addNewItem("User", "Desktop", "Folder")
addNewItem("User", "Downloads", "Folder")
addNewItem("User", "Applications", "Folder")



//--------------------------------- HTML GENERATION -----------------------------------//

function generateHTML(node, container) {

  // create a div element for the node
  const nodeElement = document.createElement("div");
  nodeElement.classList.add("node");

  // set the node's name as the text content of the div
  nodeElement.textContent = node.name;

  // add the node element to the container
  container.appendChild(nodeElement);

  // create a div element to hold the node's children
  const childrenContainer = document.createElement("div");
  childrenContainer.classList.add("children");

  // add the children container to the node element
  nodeElement.appendChild(childrenContainer);

  // generate HTML elements for each of the node's children
  for (const child of node.children) {
    generateHTML(child, childrenContainer);
  }
}

const container = document.querySelector("#tree-container");
generateHTML(System.root, container);




function addNewItem(parent, name, type){
  System.addNode(name, type, System.findNode(parent))

}

const form1 = document.querySelector("#new-node-form");

form1.addEventListener("submit", event => {
  event.preventDefault();

  // get the name and type of the new node from the form inputs
  const name = document.querySelector("#node-name").value;
  const type = document.querySelector("#node-type").value;
  const parent = document.querySelector("#node-parent").value;


  // create a new node with the given name and type
  addNewItem(parent, name, type)
  container.innerHTML = "";

  generateHTML(System.root, container);
});

const form2 = document.querySelector("#delete-node-form");

form2.addEventListener("submit", event => {
  event.preventDefault();

  // get the name and type of the new node from the form inputs
  const nodeToDelete = document.querySelector("#node-delete").value;

  System.deleteNode(System.findNode(nodeToDelete))
  // create a new node with the given name and type
  container.innerHTML = "";

  generateHTML(System.root, container);
});