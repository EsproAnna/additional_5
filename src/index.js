module.exports = function check(str, bracketsConfig) {
  var openToCloseMap = {};
  var closeToOpenMap = {};
  var sameBracketsMap = {};

  var isValid = true;

  bracketsConfig.forEach(function (config) {
    if (config[0] === config[1]) {
      sameBracketsMap[config[0]] = config[1];
    }
    else {
      openToCloseMap[config[0]] = config[1];
      closeToOpenMap[config[1]] = config[0];
    }
  });

  var expectedCloseBrakets = [];

  str.split("").forEach(function (element) {

    if (openToCloseMap[element]) {
      expectedCloseBrakets.push(openToCloseMap[element]);
    }
    else if (closeToOpenMap[element]) {
      if (expectedCloseBrakets.length < 1) {
        isValid = false;
      }
      else {
        var expectedElement = expectedCloseBrakets.pop();
        if (element !== expectedElement) {
          isValid = false;
        }
      }
    }
    else if (sameBracketsMap[element]) {
      if (expectedCloseBrakets.length > 0 && expectedCloseBrakets[expectedCloseBrakets.length - 1] === sameBracketsMap[element]) {
        expectedCloseBrakets.pop();
      }
      else {
        expectedCloseBrakets.push(element);
      }
    }

    else {
      isValid = false;
    }
  });

  if (expectedCloseBrakets.length > 0) {
    isValid = false;
  }

  return isValid;
}
