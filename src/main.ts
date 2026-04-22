console.log('test');
const add = (x: number, y: number) => x + y;
const subtract = (x: number, y: number) => x - y;
const multiply = (x: number, y: number) => x * y;
const divide = (x: number, y: number) => (y === 0 ? 'nice try' : x / y);

const operate = (xOperand: string, operator: string, yOperand: string) => {
    const x = parseFloat(xOperand);
    const y = parseFloat(yOperand);
    console.log(operator);
    switch (operator) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case '×':
            return multiply(x, y);
        case '÷':
            return divide(x, y);
        default:
            updateDisplay('err');
            return 'Error';
    }
};

const updateDisplay = (content: string) => {
    const display = document.querySelector('#display');
    if (display) display.textContent = content.trim();
};

const getDisplayContent = (
    operand1: string,
    operator: string,
    operand2: string,
) => {
    return `${operand1}${operator ? ' ' + operator : ''}${operand2 ? ' ' + operand2 : ''}`;
};

const init = () => {
    const buttons = document.querySelector<HTMLButtonElement>('#buttons');
    let operand1 = '',
        operator = '',
        operand2 = '';
    let newCalculation = false;

    const resetState = () => {
        operand1 = '';
        operator = '';
        operand2 = '';
        newCalculation = false;
    };

    if (buttons) {
        buttons.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            if (!target.classList.contains('button')) return;
            const value = target.value;
            console.log(value);
            if (target.classList.contains('digit')) {
                const currentOperand = operator ? operand2 : operand1;

                if (value === '.' && currentOperand.includes('.')) return;
                if (value !== '.' && currentOperand === '0') return;

                if (operator) {
                    if (value === '.' && !operand2.length) {
                        operand2 += '0';
                    }
                    operand2 += target.textContent?.trim();
                } else {
                    if (newCalculation) resetState();
                    if (value === '.' && !operand1.length) {
                        operand1 += '0';
                    }
                    operand1 += target.textContent?.trim();
                }
            } else if (target.classList.contains('operator')) {
                if (operand1.length && operator.length && operand2.length) {
                    operand1 = `${operate(operand1, operator, operand2)}`;
                    operand2 = '';
                }
                operator = target.textContent?.trim();
            } else if (target.classList.contains('enter')) {
                if (operand1.length && operator.length && operand2.length) {
                    console.log(operator);
                    operand1 = `${operate(operand1, operator, operand2)}`;
                    operator = '';
                    operand2 = '';
                    newCalculation = true;
                }
            } else if (target.classList.contains('delete')) {
                if (operand2) {
                    operand2 = operand2.slice(0, -1);
                } else if (operator) {
                    operator = '';
                } else if (operand1) {
                    operand1 = operand1.slice(0, -1);
                }
            } else if (target.classList.contains('clear')) {
                resetState();
            } else {
                console.error('There was an error. Please try again.');
            }
            updateDisplay(getDisplayContent(operand1, operator, operand2));
        });
    }

    document.addEventListener('keydown', (event) => {
        const buttons = document.querySelectorAll<HTMLButtonElement>('.button');
        buttons.forEach((button) => {
            if (
                button.value === event.key ||
                (event.key === 'Enter' && button.classList.contains('enter'))
            ) {
                button.click();
            }
        });
    });
};

init();
