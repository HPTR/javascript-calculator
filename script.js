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

    clear.innerText = 'C';
    calculator.clearStatus = 'clear';

    // Checks if any operators have been pressed and proceeds to type new number if so
    allOperators.forEach((button, index) => {
        if (allOperators[index].classList.length === 4) {

            allOperators.forEach((button) => {
                button.classList.remove('pressed');
            });

            display.value = event.target.value;

        }
    });

    if (calculator.result !== undefined) {
        display.value = event.target.innerText;
    }

    //appends display with clicked number
    if (Number(display.value[0]) === 0 && display.value.length === 1) {
        display.value = event.target.innerText;
    } else {
        display.value += event.target.innerText;
    }

}

const handleOperatorPress = (event) => {

    console.log(event.target);

    allOperators.forEach((button) => {
            button.classList.remove('pressed');
    });

    event.target.classList.add('pressed'); //Remember to remove this in calculate button press too
    
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