function add(a, b) {
  a = Number(a);
  b = Number(b);
  return a + b;
}

function subtract(a, b) {
  a = Number(a);
  b = Number(b);
  return a - b;
}

function multiply(a, b) {
  a = Number(a);
  b = Number(b);
  return a * b;
}

function divide(a, b) {
  a = Number(a);
  b = Number(b);

  if (!b) {
    throw new Error(`Invalid dividend ${n}`);
  }
  return a / b;
}
