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

const operate = (x,y,operation) => {
    switch (operation) {
        case "add":
            add(x,y);
        case "subtract":
            subtract(x,y);
        case "multiply":
            multiply(x,y);
        case "divide":
            divide(x,y);
        default:
            console.error("not a valid operation");
    }
}