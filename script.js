// Variables

const allButtons = document.querySelectorAll('.calculator__button');
const display = document.getElementById('display');

const calculator = {
    numOne: undefined,
    numTwo: undefined,
    operator: undefined,
}

// Event Handlers

const handleButtonPress = (event) => {
    console.log(event.target.innerText);
    display.value = event.target.innerText;
}

// Event Listeners

allButtons.forEach((button) => {
    button.addEventListener('click', handleButtonPress)
});

display.value = (8);