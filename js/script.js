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
    console.log(x,operator,y);
    switch (operator) {
        case "+":
            return add(x,y);
        case "-":
            return subtract(x,y);
        case "*":
            return multiply(x,y);
        case "/":
            return divide(x,y);
        default:
            console.error("not a valid operation");
    }
}

const updateDisplay = (content) => {
    const display = document.querySelector("#display");
    display.textContent = content;
};

const clearDisplay = (display) => {
    display.textContent = "";
}

const init = () => {
    let operand1 = "", operator = "", operand2 = "";
    const buttons = document.querySelector("#buttons");
    const display = document.querySelector("#display");
    
    buttons.addEventListener("click", (event) => {
        const textContent = display.textContent;
        const button = event.target.value;
        if (button === "clear") {
            clearDisplay(display);
            operand1 = "", operator = "", operand2 = "";
        } else if (button === "submit") {
            if (operand1 && operator && operand2) {
                const result = operate(operand1, operator, operand2);
                updateDisplay(result);
                operand1 = "";
                operator = "";
                operand2 = "";
            }
        } else if (button === "delete") {
            // do nothing for now
        } else if (button === ".") {
            // do nothing for now
        } else if (!isNaN(button)) {
            if (operand1 && operator) {
                operand2 += button
            } else {
                console.log("num 1");
                operand1 += button;
            }
            updateDisplay(operand1 + operator + operand2);
        } else {
            if (operand1 && !operator) {
                operator = button
                updateDisplay(operand1 + operator + operand2);
            } else if (operand1 && operator && operand2) {
                const result = operate(operand1, operator, operand2);
                operand1 = result;
                operator = button;
                operand2 = "";
                updateDisplay(operand1 + operator);
            }
        }
    });
}

init();