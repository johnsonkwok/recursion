// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // create mainNode variable equal to document.body
  // create helper function traverseInnerNodes
  // use traverseInnerNodes function with mainNode and an empty holder array as arguments to return the output array with the elements that have the inputted class name
  const mainNode = document.body;

  function traverseInnerNodes(node, selectedNodes) {
    // check if current node has the inputted className from the main function
      // if it does, add it to the selectedNodes holder array containing the desired elements
    // if the current node has no child nodes
      // return the selectedNodes array
    // else 
      // use for...of loop to iterate over the child nodes
        // use recursive calls to the traverseInnerNodes function to find other elements containing the inputted class name
        // add the elements with the inputted class name to the selectedNodes array
      // return the selectedNodes array
    if (node.classList !== undefined && node.classList.contains(className)) {
      selectedNodes.push(node);
    }
    if (node.childNodes.length === 0) {
      return selectedNodes;
    } else {
      for (let innerNode of node.childNodes) {
        selectedNodes.concat(traverseInnerNodes(innerNode, selectedNodes));
      }
      return selectedNodes;
    }
  }
  
  return traverseInnerNodes(mainNode, []);
};

// Alternate solution without using a helper function
// var getElementsByClassName = function(className, node = document.body) {
//   let selectedNodes = [];
//   if (node.classList !== undefined && node.classList.contains(className)) {
//     selectedNodes.push(node);
//   }

//   for (let innerNode of node.childNodes) {
//     selectedNodes = selectedNodes.concat(getElementsByClassName(className, innerNode));
//   }

//   return selectedNodes;
// }
