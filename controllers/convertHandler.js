function numberStringSplitter(input) {
  let number = input.match(/[.\d\/]+/g) || ["1"]; // Default to "1" if no number
  let string = input.match(/[a-zA-Z]+/g)[0]; // Assign the unit to 'string'

  return [number[0], string];
}


function checkDiv(possibleFraction) {
  let nums = possibleFraction.split("/");
  // allows fractions 1/2 but prevents invalid form 1/2/3.
  if (!nums || nums.length > 2) {
    return 'invalid number';
  }
  return nums;
}

function ConvertHandler() {

  this.getNum = function(input) {
    let result = numberStringSplitter(input)[0];
    let nums = checkDiv(result);

    if (!nums) {
      return 'invalid number';
    }

    let num1 = nums[0];
    let num2 = nums[1] || 1;

    result = parseFloat(num1) / parseFloat(num2);

    if (isNaN(result)) {
      return 'invalid number'; // Return 'invalid number' if NaN
    }
    return result;
  };


  this.getUnit = function(input) {
    let result = numberStringSplitter(input)[1]?.toLowerCase();

    const validUnits = ["km", "gal", "lbs", "mi", "l", "kg"];

    if (!validUnits.includes(result)) {
      return 'invalid unit'; // Return 'invalid unit' for invalid units
    }

    return result === "l" ? "L" : result;
  };


  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit) {
      case 'gal':
        result = 'L';
        break;
      case 'L': // Changed to uppercase 'L'
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      default:
        result = 'invalid unit';
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'L': // Update to match 'L' from getUnit
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      default:
        result = 'invalid unit';
        break;
    }
    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return 'invalid number and unit'; // Return both errors together
    }

    if (initUnit === 'invalid unit') { 
      return 'invalid unit'; 
    }

    if (initNum === 'invalid number') {
      return 'invalid number';
    }

    switch(initUnit) {
      case 'gal':
        result = initNum * galToL; 
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg; 
        break;
      case 'kg':
        result = initNum / lbsToKg; 
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = 'invalid unit';
        break;
    }

    return typeof result === 'number' ? parseFloat(result.toFixed(5)) : result;
  };


  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    return `${initNum} ${this.spellOutUnit(
      initUnit
      )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;