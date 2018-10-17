// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  const nodes = window.document.body.childNodes;
  
  for (let i = 0; i < nodes.length; i++) {
    if (!nodes[i].classList == className) {
      
    }
  }
  return selectedNodes;
};
