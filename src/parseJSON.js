// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // start with first character of json string
    // create variables for current char and index of current char
  // invoke parseVal function, which identifies item to be parsed
    // use appropriate helper function to parse that item
    // make recursive calls to parseVal function as needed for objects and arrays and nested values
    // throw error if invalid JSON inputted

  let currChIdx = 0;
  let currCh = json[currChIdx];

  return parseVal();

  function parseVal() {
    if (currCh === '"') {
      return parseStr();
    } else if (currCh === 't' || currCh === 'f' || currCh === 'n') {
      return parseBool();
    } else if (currCh === '[') {
      return parseArr();
    } else if (currCh === '{') {
      return parseObj();
    } else if (currCh === '-' || (currCh && currCh >= 0 && currCh <= 9)) {
      return parseNum();
    } else {
      throwErr();
    }
  }
  
  function throwErr() {
    throw new SyntaxError('Invalid stringified JSON');
  }

  function setNextCh() {
    // this function is used to keep track of the current char    
      // also returns the current char, which may be useful for moving to the next item of an array or object
    currChIdx++;
    currCh = json[currChIdx];
    return currCh;
  }

  function parseStr() {
    // create empty holder string variable
      // add chars to holder string variable until a end quote is reached
    // return string
    let str = '';
    setNextCh();

    const escapes = {
      'b': '\b',
      'n': '\n',
      't': '\t',
      'r': '\r',
      'f': '\f',
      '\"': '\"',
      '\\': '\\'
    };
    
    while (currCh) {
      if (currCh === '"') {
        setNextCh();
        return str;
      }

      if (currCh === '\\') {
        setNextCh();
        if (escapes.hasOwnProperty(currCh)) {
          str += escapes[currCh];
        } else {
          str += currCh;
        }
      } else {
        str += currCh;
      }

      setNextCh();
    }

    throwErr();
  }

  function parseNum() {
    // create empty holder string variable for the number
      // add negative sign or digits as needed
      // add decimal point if present
        // add additional digits after decimal point
    // convert string to a number and return number
    let num = '';
    
    function getDigits() {
      while (currCh && currCh >= 0 && currCh <= 9) {
        num += currCh;
        setNextCh();
      }
    }

    if (currCh === '-') {
      num += currCh;
      setNextCh();
    }

    getDigits();

    if (currCh === '.') {
      num += currCh;
      setNextCh();
      getDigits();
    }

    if (!Number.isNaN(Number(num))) {
      return Number(num);
    } else {
      throwErr();
    }
  }

  function parseBool() {
    // create empty holder variable for boolean/null
    // get the next 4 or 5 chars as needed
      // if boolean string equals 'true' or 'null'
        // return true or null, respectively
      // if boolean string equals 'false'
        // return false
    let bool = '';
    for (let i = 0; i < 4; i++) {
      bool += currCh;
      setNextCh();
    }

    if (bool === 'true') {
      return true;
    } else if (bool === 'null') {
      return null;
    } else if (bool === 'fals') {
      bool += currCh;
      setNextCh();
      return false;
    } else {
      throwErr();
    }
  } 

  function parseArr(jsonArr) {
    // create holder array variable
    // if next char is end bracket
      // return empty array
    // else use do...while loop to push value(s) into holder array
      // do...while loop is used because we know there is at least one value to be added to the holder array (not an empty array)
      // if the char after the value is a comma
        // set the next char in the json and continue loop
    const arr = [];
    if (setNextCh() === ']') {
      return arr;
    }

    do {
      arr.push(parseVal());
      if (currCh === ']') {
        setNextCh();
        return arr;
      }
    } while (currCh === ',' && setNextCh());

    throwErr();
  }

  function parseObj(jsonObj) {
    // create holder object variable
    // if next char is end brace
      // return empty object
    // else use do...while loop to add key:value pairs into holder object
      // do...while loop is used because we know there is at least one key:value pair to be added to the holder object (not an empty object)
      // if the char after the value is a comma
        // set the next char in the json and continue loop
    const obj = {};
    if (setNextCh() === '}') {
      return obj;
    }

    do {
      const key = parseStr();
      setNextCh();
      obj[key] = parseVal();
      if (currCh === '}') {
        setNextCh();
        return obj;
      }
    } while (currCh === ',' && setNextCh());

    throwErr();
  }

};
