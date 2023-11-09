for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [cell, cellProp] = getCellAndCellProp(address);
      cellProp.value = cell.innerText;
    });
  }
}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && formulaBar.value) {
    let exp = formulaBar.value.replace(/\s+/g, "");
    let elements = exp.split(/[+\-*/]/).filter(Boolean);
    for (let i = 0; i < elements.length; i++) {
      if (isNaN(elements[i])) {
        if (
          elements[i].charCodeAt(0) >= 65 &&
          elements[i].charCodeAt(0) <= 90
        ) {
          let [cell, cellProp] = getCellAndCellProp(elements[i]);
          exp = exp.replace(elements[i], cellProp.value);
        } else {
          window.alert("Please provide a valid expression");
          break;
        }
      }
    }
    let evaluated = evluateFormula(exp);
    setCellAndCellProp(addressBar.value, evaluated, formulaBar.value);
  }
});

function evluateFormula(expression) {
  console.log(expression);
  return eval(expression);
}
