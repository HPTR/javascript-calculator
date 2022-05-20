// Variables

const allButtons = document.querySelectorAll('.calculator__button');
const allNumbers = document.querySelectorAll('.calculator__button--number');
const allOperators = document.querySelectorAll('.calculator__button--operator')
const display = document.getElementById('display');
const calculate = document.getElementById('calculate');
const clear = document.getElementById('clear');

const calculator = {
    numOne: undefined,
    numTwo: undefined,
    operator: undefined,
    result: undefined,
    lastPressedType: undefined
}

// Event Handlers

const handleNumberPress = (event) => {

    //Sets Clear button to display C
    clear.innerText = 'C';

    //If a result has just been calculated, reset to default state
    if (calculator['lastPressedType'] === 'calculate') {
        calculator.numOne = undefined;
        calculator.numTwo = undefined;
        display.value = event.target.value;
    };

    //If an operator was the last button pressed, save the current number, and display the newly clicked number. Also clear pressed status of operators.
    if (calculator['lastPressedType'] === 'operator') {

        calculator.numOne = display.value;
        display.value = event.target.value;

        allOperators.forEach((button) => {
            button.classList.remove('pressed');
        });

    };

    //If a button was last pressed, add the pressed number to the current displayed one, if not, start a new number
    if (calculator['lastPressedType'] === 'number') {
        display.value += event.target.value;
     } else {
        display.value = event.target.value;
    };

    calculator.lastPressedType = 'number';
}

const handleOperatorPress = (event) => {

    console.log(event.target);

    allOperators.forEach((button) => {
            button.classList.remove('pressed');
    });

    event.target.classList.add('pressed');
    
    switch (event.target.id) {
        case 'add':
            calculator.operator = '+';
            break;
        case 'subtract':
            calculator.operator = '-';
            break;
        case 'multiply':
            calculator.operator = '*';
            break;
        case 'divide':
            calculator.operator = '/';
            break;
    };

    calculator.numOne = Number(display.value);

    calculator.lastPressedType = 'operator';
}

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

const handleClearPress = (event) => {

    if (clear.innerText === 'AC') {
        calculator.numOne = undefined;
        calculator.numTwo = undefined;
        calculator.operator = undefined;
        calculator.result = undefined;

        allOperators.forEach((button) => {
            button.classList.remove('pressed');
    });
    
    }

    if (calculator.numOne === undefined) {
        display.value = 0;
        clear.innerText = 'AC';
    } else if (calculator.numOne !== undefined) {
        display.value = 0;
        clear.innerText = 'AC';
    }

}



// Event Listeners


// Number Press
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