// Variables

const allButtons = document.querySelectorAll('.calculator__button');
const allNumbers = document.querySelectorAll('.calculator__button--number');
const allOperators = document.querySelectorAll('.calculator__button--operator')
const display = document.getElementById('display');
const calculate = document.getElementById('calculate');

const calculator = {
    numOne: undefined,
    numTwo: undefined,
    operator: undefined,
}

// Event Handlers
console.log(display.value[0])
const handleNumberPress = (event) => {
//prevents typing more than 10 numbers
    if (display.value.length === 10) {
        return false;
    }

    //appends display with clicked number

    if (Number(display.value[0]) === 0 && display.value.length === 1) {
        display.value = event.target.innerText;
    } else {
        display.value += event.target.innerText;
    }

}

const handleOperatorPress = (event) => {

    allOperators.forEach((button) => {
            button.classList.remove('pressed');
    });

    event.target.classList.add('pressed'); //Remember to remove this in calculate button press too
    
    switch (event.target.innerText) {
        case '+':
            calculator.operator = '+';
        case '-':
            calculator.operator = '-';
        case '×':
            calculator.operator = '*';
        case '÷':
            calculator.operator = '/';
const handleCalculatePress = (event) => {

    calculator.numTwo = Number(display.value);

    console.log(calculator)

    switch (calculator.operator) {
        case '+':
            calculator.result = calculator.numOne + calculator.numTwo;
            break;
        case '-':
            calculator.result = calculator.numOne - calculator.numTwo;
            break;
        case '*':
            calculator.result = calculator.numOne * calculator.numTwo;
            break;
        case '/':
            calculator.result = calculator.numOne / calculator.numTwo;
            break;
    };

    display.value = parseFloat(calculator.result.toFixed(8));

}
}

// Event Listeners


// Adds the clicked number to the display
allNumbers.forEach((button) => {
    button.addEventListener('click', handleNumberPress);
});

//Operator Press
allOperators.forEach(button => {
    button.addEventListener('click', handleOperatorPress);
})

// Calculate Press
calculate.addEventListener('click', handleCalculatePress);

// Clear Press
clear.addEventListener('click', handleClearPress);