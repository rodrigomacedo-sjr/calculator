/*
 *  Math and validations
 */
const OPERATORS = ["+", "-", "×", "÷", "%"];

let numberA, numberB, operator;

function validateNumber(num) {
  let validNum = Number(num);

  if (isNaN(validNum)) throw new Error(`Invalid number ${num}`);

  return validNum;
}

function validateOperator(opr) {
  if (OPERATORS.includes(opr)) return opr;

  throw new Error(`Invalid operator ${opr}`);
}

function handleNumpad(but) {
  if (but === ".") handleDecimal();
  else if (but === "←") handleBackspace();
  else handleNums(but);
}

function handleNums(num) {
  if (operator === undefined) {
    numberA = numberA ? numberA + num : num;
  } else {
    numberB = numberB ? numberB + num : num;
  }
}

function handleDecimal() {
  if (operator === undefined) {
    if (!String(numberA).includes(".")) {
      numberA += ".";
    }
  } else {
    if (!String(numberB).includes(".")) {
      numberB += ".";
    }
  }
}

function handleBackspace() {
  if (operator === undefined && numberA != 0) {
    numberA = numberA.split("").slice(0, -1).join("");
  } else if (operator !== undefined && numberB === undefined) {
    operator = undefined;
  } else {
    numberB = numberB.split("").slice(0, -1).join("");
  }
}

function setOperator(opr) {
  if (!numberA) numberA = 0;
  operator = validateOperator(opr);
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (!b) {
    throw new Error(`Invalid dividend ${n}`);
  }
  return a / b;
}

function rest(a, b) {
  if (!b) {
    throw new Error(`Invalid dividend ${n}`);
  }

  return a % b;
}

function invertSignal() {
  numberA = operator ? numberA : -numberA;
  numberB = operator ? -numberB : numberB;
}

/*
 *  Draw calculator
 */
const NUMPAD = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "←", "0", "."];
const UTILS = ["C", "÷", "±", "×", "%", "-", "=", "+"];

function drawCalculator() {
  drawNumpad();
  drawUtils();
}

function drawNumpad() {
  const numpad = document.querySelector(".numbers");

  for (let x of NUMPAD) {
    let button = document.createElement("button");
    button.textContent = x;
    button.className = "num-button";
    numpad.appendChild(button);
  }
}

function drawUtils() {
  const utils = document.querySelector(".utils");

  for (let x of UTILS) {
    let button = document.createElement("button");
    button.textContent = x;
    button.className = "utils-button";
    utils.appendChild(button);
  }
}

/*
 *  User input processing
 */
function setupNumsButtonLogic() {
  let numbers = document.querySelector(".numbers");

  numbers.addEventListener("click", (e) => {
    handleNumpad(e.target.textContent);
  });
}

function setupUtilsButtonLogic() {
  let utils = document.querySelector(".utils");

  utils.addEventListener("click", (e) => {
    try {
      setOperator(e.target.textContent);
    } catch (error) {
      processUtil(e.target.textContent);
    }
  });
}

function processUtil(util) {
  switch (util) {
    case "C":
      reset();
      break;
    case "±":
      invertSignal();
      break;
    case "=":
      calculate();
  }
}

function reset() {
  numberA = 0;
  numberB = 0;
  operator = undefined;
}

function calculate() {
  numberA = Number(numberA);
  numberB = Number(numberB);

  let result;
  switch (operator) {
    case "+":
      result = add(numberA, numberB);
      break;

    case "-":
      result = subtract(numberA, numberB);
      break;

    case "×":
      result = multiply(numberA, numberB);
      break;

    case "÷":
      result = divide(numberA, numberB);
      break;

    case "%":
      result = rest(numberA, numberB);
      break;
  }
  reset();
  numberA = Number(result.toFixed(3));
}

/*
 *  Display
 */
function updateDisplay() {
  const display = document.querySelector(".display");
  display.textContent = `${numberA ? numberA : 0} ${operator ? operator : ""} ${numberB ? numberB : ""}`;
}

/*
 *  Setup
 */
drawCalculator();
setupNumsButtonLogic();
setupUtilsButtonLogic();

const keypad = document.querySelector(".keypad");
keypad.addEventListener("click", updateDisplay);
