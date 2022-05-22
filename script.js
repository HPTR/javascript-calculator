// Variables

const allButtons = document.querySelectorAll('.calculator__button');
const allNumbers = document.querySelectorAll('.calculator__button--number');
const allOperators = document.querySelectorAll('.calculator__button--operator');
const allFunctions = document.querySelectorAll('.calculator__button--function');
const display = document.querySelector('.calculator__display');
const calculate = document.querySelector('.calculate');
const clear = document.querySelector('.clear');

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
            button.classList.remove('calculator__button--pressed');
        });

    };

    //If a button was last pressed, add the pressed number to the current displayed one, if not, start a new number
    calculator['lastPressedType'] === 'number' ? display.value += event.target.value : display.value = event.target.value;

    calculator.lastPressedType = 'number';
}

const handleOperatorPress = (event) => {

    //Remove the pressed modifier from other operators
    allOperators.forEach((button) => {
            button.classList.remove('calculator__button--pressed');
    });

    //Add the pressed modifier to the pressed operator
    event.target.classList.add('calculator__button--pressed');
    
    //Save pressed operator to the calculator object
    switch (event.target.value) {
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

    //Add the currently displayed number to the calculator object
    calculator.numOne = Number(display.value);

    calculator.lastPressedType = 'operator';
}

const handleCalculatePress = (event) => {

    //If the last pressed button was calculate, use the calculated result to perform the calculation again on that value
    calculator['lastPressedType'] === 'calculate' ? calculator.numOne = display.value : calculator.numTwo = Number(display.value)


    //If calculate is pressed and a number is missing, do nothing
    if (!calculator.numTwo || !calculator.numOne) {
        display.value = display.value
        calculator.lastPressedType = 'calculate';
        return;
    }


    //Perform the calculation and save the result to the calculator object
    switch (calculator.operator) {
        case '+':
            calculator.result = Number(calculator.numOne) + Number(calculator.numTwo);
            break;
        case '-':
            calculator.result = Number(calculator.numOne) - Number(calculator.numTwo);
            break;
        case '*':
            calculator.result = Number(calculator.numOne) * Number(calculator.numTwo);
            break;
        case '/':
            calculator.result = Number(calculator.numOne) / Number(calculator.numTwo);
            break;
    };

    //Display the result at a maximum of 8 numbers
    display.value = parseFloat(calculator.result.toFixed(8));

    calculator.lastPressedType = 'calculate';
}

const handleFunctionPress = (event) => {


    //If clear was pressed, and the last pressed button was also clear, remove saved numbers, result, and operator from the calculator object. If clear was not the last pressed button, remove the currently displayed value and change the text on the button
    if (event.target.value === 'clear') {

        if (calculator['lastPressedType'] === 'clear') {
            calculator.numOne = undefined;
            calculator.numTwo = undefined;
            calculator.operator = undefined;
            calculator.result = undefined;
    
            allOperators.forEach((button) => {
                button.classList.remove('calculator__button--pressed');
            });
    
        } else {
            display.value = '0';
            clear.innerText = 'AC';
        };
    
        calculator.lastPressedType = 'clear';

    }

    //If percentage is pressed, divide the number by 100 - to be used to calculate the percentage of another number
    if (event.target.value === 'percentage') {
        display.value = Number(display.value) / 100;

        calculator.lastPressedType = 'percentage';
    }

    //If polarity is pressed, add a minus to the front of the displayed number, if one is already present, remove it
    if (event.target.value === 'polarity') {
        if (display.value[0] === '-') {
            display.value = display.value.substring(1);
        } else {
            display.value = '-' + display.value;
        }

        calculator.lastPressedType = 'polarity';
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

// Function Press
allFunctions.forEach(button => {
    button.addEventListener('click', handleFunctionPress);
})