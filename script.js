// Variables

const allButtons = document.querySelectorAll('.calculator__button');
const allNumbers = document.querySelectorAll('.calculator__button--number');
const allOperators = document.querySelectorAll('.calculator__button--operator')
const display = document.getElementById('display');

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
    };

    console.log(calculator.operator)
}

// Event Listeners

allButtons.forEach((button) => {
    button.addEventListener('click', handleButtonPress)
});

display.value = (8);