/*
 *  Math
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

function setNumber(num) {
  num = Number(num);
  if (operator === undefined) numberA = num;
  else numberB = num;
}

function setOperator(opr) {
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
  let n = operator ? numberB : numberA;
  setNumber(-n);
}

/*
 *  Draw calculator
 */
const NUMPAD = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "♥", "0", "."];
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
 *  User input and output
 */
function setupNumsButtonLogic() {
  let numbers = document.querySelector(".numbers");

  numbers.addEventListener("click", (e) => {
    setNumber(e.target.textContent);
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
  numberA = undefined;
  numberB = undefined;
  operator = undefined;

  /* TODO: reset display */
}

function calculate() {
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
  numberA = result;
  /* TODO: update display */
}

/*
 *  Setup
 */
drawCalculator();
setupNumsButtonLogic();
setupUtilsButtonLogic();

const keypad = document.querySelector(".keypad");
keypad.addEventListener("click", () => {
  console.log(`${numberA} ${operator} ${numberB}`);
});
