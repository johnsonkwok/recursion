// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // *** Base Cases ***
  // if obj is null, NaN, Infinity, or -Infinity
    // return the string 'null' 
  // if obj is a boolean or number
    // return the obj as a string
  // if obj is a string
    // return obj as a string with double quotes
  if (obj === null || Number.isNaN(obj) || obj === Infinity || obj === -Infinity) {
    return 'null';
  } else if (typeof obj === 'boolean' || typeof obj === 'number') {
    return `${obj}`;
  } else if (typeof obj === 'string') {
    return `"${obj}"`;

  // *** Recursive Cases ***
  // if obj is an array
    // add two additional base cases for elements that are undefined or function types
      // these elements will become 'null' after being stringified
    // use map method to apply recursive call of stringifyJSON on elements other than undefined or functions
      // join array with ',' and add brackets to beginning and end of string
  // if obj is an object
    // create holder variable for output string
    // use for...in loop to add keys in double quotes and values obtained through recursive calls to the output string
      // skip over values that are undefined or functions
    // add curly braces as strings to beginning and end of output string
  } else if (Array.isArray(obj)) {
    return '[' + obj.map(function(item) {
      if (typeof item === 'undefined' || typeof item === 'function') {
        return 'null';
      } else {
        return stringifyJSON(item);
      }
    }).join(',') + ']';
  } else if (typeof obj === 'object') {
    const objKeys = Object.keys(obj);
    let stringifiedObj = '';
    for (let key in obj) {
      if (obj[key] === undefined || typeof obj[key] === 'function') {
        stringifiedObj += '';
      } else if (key === objKeys[objKeys.length - 1]) {
        stringifiedObj += `"${key}":` + stringifyJSON(obj[key]);
      } else {
        stringifiedObj += `"${key}":` + stringifyJSON(obj[key]) + ',';
      }
    }
    return '{' + stringifiedObj + '}';
  }
};
