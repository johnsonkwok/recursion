// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // identify item to be parsed
    // use appropriate helper function to parse that item

  const firstChar = json[0];
  const lastChar = json[json.length - 1];
  let currCharIdx = 0;
  const parsedArr = [];
  const parsedObj = {};

  if (firstChar === '"' && lastChar === '"') {
    return parseStr(json);
  } else if (json === 'true' || json === 'false' || json === 'null') {
    return parseBool(json);
  } else if (!Number.isNaN(Number(json)) && json !== '') {
    return parseNum(json);
  } else if (firstChar === '[' && lastChar === ']') {
    return parseArr(json);
  } else if (firstChar === '{' && lastChar === '}') {
    return parseObj(json);
  } else {
    throw new SyntaxError('Invalid stringified JSON');
  }
  

  function setNextCharIdx() {
    currCharIdx++;
    if (firstChar !== '"' && json[currCharIdx] === ' ') {
      setNextCharIdx();
    }
  }

  function parseStr(jsonStr) {
    return jsonStr.slice(1, -1);
  }

  function parseNum(jsonNum) {
    return Number(jsonNum);
  }

  function parseBool(jsonBool) {
    if (jsonBool === 'true') {
      return true;
    } else if (jsonBool === 'false') {
      return false;
    } else if (jsonBool === 'null') {
      return null;
    }
  } 

  function parseObj(jsonObj) {

  }

  function parseMember(jsonMemb) {

  }

  function parsePair(jsonPair) {

  }

  function parseArr(jsonArr) {
    if (jsonArr === '[]') {
      return [];
    } else {
      setNextCharIdx();
      return parseElem(jsonArr.slice(currCharIdx, -1));
    }
  }

  function parseElem(jsonElem) {
    if (!jsonElem.includes(',')) {
      parsedArr.push(parseJSON(jsonElem));
      return parsedArr;
    } else {
      let commaIdx = (jsonElem.indexOf(','));
      if (jsonElem[0] === '"') {
        commaIdx = jsonElem.search(/",/) + 1;
      } else if (jsonElem[0] === '[') {
        if (jsonElem[jsonElem.length - 1] === ']') {
          commaIdx = jsonElem.length;
        } else {
          commaIdx = jsonElem.search(/],/) + 1;
        }
      } else if (jsonElem[0] === '{') {
        commaIdx = jsonElem.search(/},/) + 1;
      }
      // console.log(jsonElem, commaIdx);
      parsedArr.push(parseJSON(jsonElem.slice(0, commaIdx)));
      // currCharIdx += commaIdx;
      // setNextCharIdx();
      let remainingItems = jsonElem.slice(commaIdx + 1);
      return remainingItems ? parseElem(remainingItems) : parsedArr;
    }
  } 

};
