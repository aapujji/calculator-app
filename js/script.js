const add = (x,y) => {
    return x + y;
}

const subtract = (x,y) => {
    return x - y;   
}

const multiply = (x,y) => {
    return x * y;
}

const divide = (x,y) => {
    return x / y;
}

const operate = (x,operator,y) => {
    x = parseFloat(x)
    y = parseFloat(y);
    switch (operator) {
        case "+":
            return add(x,y);
        case "-":
            return subtract(x,y);
        case "×":
            return multiply(x,y);
        case "÷":
            return divide(x,y);
        default:
            console.error("not a valid operation");
    }
}

const updateDisplay = (content) => {
    const display = document.querySelector("#display");
    display.textContent = content;
};

const init = () => {
    const buttons = document.querySelector("#buttons");
    let operand1 = "", operator = "", operand2 = "";
    let resetCalculator = false;
    
    buttons.addEventListener("click", (event) => {
        const target = event.target;
        if (target.id === "buttons") return;
        switch (true) {
            case target.classList.contains("digit"):
                if (operator.length) {
                    if (target.textContent === "." && operand2.includes(".")) return;
                    if (target.textContent === "0" && operand2[operand2.length-1] === "0") return;
                    if (target.textContent === "." && !operand2.length) {
                        operand2 += "0";
                    }
                    operand2 += target.textContent;
                } else {
                    if (resetCalculator) {
                        operand1 = "";
                        resetCalculator = false;
                    }
                    if (target.textContent === "." && operand1.includes(".")) return;
                    if (target.textContent === "0" && operand1[operand1.length-1] === "0") return;
                    if (target.textContent === "." && !operand1.length) {
                        operand1 += "0";
                    }
                    operand1 += target.textContent;
                }
                break;
            case target.classList.contains("operator"):
                if (operand1.length && !operator.length) {
                    operator = target.textContent;
                } else if (operand1.length && operator.length && operand2.length) {
                    const result = `${operate(operand1, operator, operand2)}`;
                    operand1 = result;
                    operator = target.textContent;
                    operand2 = "";
                }
                break;
            case target.classList.contains("enter"):
                if (operand1.length && operator.length && operand2.length) {
                    const result = `${operate(operand1, operator, operand2)}`;
                    operand1 = result;
                    operator = "";
                    operand2 = "";
                    resetCalculator = true;
                }
                break;
            case target.classList.contains("clear"):
                operand1 = "", operator = "", operand2 = "";
                break;
            default:
                console.error("There was an error. Please try again.");
                break;
        }
        updateDisplay(`${operand1} ${operator} ${operand2}`);
    });
}

init();