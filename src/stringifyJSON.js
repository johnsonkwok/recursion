// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  if (obj === null || Number.isNaN(obj) || obj === Infinity || obj === -Infinity) {
    return 'null';
  } else if (typeof obj === 'boolean' || typeof obj === 'number') {
    return `${obj}`;
  } else if (typeof obj === 'string') {
    return `"${obj}"`;
  } else if (Array.isArray(obj)) {
    return '[' + obj.reduce(function(acc, cv) {
      if (typeof cv === 'undefined' || typeof cv === 'function') {
        return [...acc, 'null'];
      } else {
        return [...acc, stringifyJSON(cv)];
      }
    }, []).join(',') + ']';
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
