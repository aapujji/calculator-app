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
    x = parseInt(x)
    y = parseInt(y);
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

const isNumber = (string) => {
    return !isNaN(string);
}

const init = () => {
    const buttons = document.querySelector("#buttons");
    let operand1 = "", operator = "", operand2 = "";
    let resetCalculator = false;
    
    buttons.addEventListener("click", (event) => {
        event.preventDefault();
        const target = event.target;
        switch (true) {
            case target.classList.contains("digit"):
                if (operator.length) {
                    operand2 += target.textContent;
                } else {
                    if (resetCalculator) {
                        operand1 = "";
                        resetCalculator = false;
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