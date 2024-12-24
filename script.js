//Collection of buttons and result display
const resultDisplay = document.getElementById('result');
const buttons = document.querySelectorAll('button');

//track current input
let currentInput = ' ';
let operator = ' ';
let previousInput = ' ';

//Button clicks 
buttons.forEach(button => {
    button.addEventListener('click', ()=> {
        const value = button.textContent; //determines the action of the button

        //CLEAR button
        if (value == 'CLEAR') {
            currentInput = '';
            previousInput = '';
            operator = '';
            resultDisplay.value = '';
            return;
        }

        //operator buttons
        //unicode for multiply is \u00D7 and unicode for divide is \u00F7
        if (['+', '-', '\u00D7', '\u00F7'].includes(value)) {
            if (currentInput === '' && previousInput === '') {
                return; //ignore operator if no input
            }
            if (currentInput !== '') {
                previousInput = currentInput;
                currentInput = '';
            }
            operator = value;
            return;
        }

        //equals button
        if (value === '=') {
            if (currentInput !== '' && previousInput !== '' && operator) {
                const result = calculate(previousInput,currentInput,operator);
                resultDisplay.value = result;
                previousInput = result.toString();
                currentInput = '';
                operator = '';
            }
            return;
        }

        //number and decimal input
        if (!isNaN(value) || value === '.') {
            currentInput += value;
            resultDisplay.value = currentInput;
        }
    });
});

//function for calculation
function calculate(num1, num2, operator){
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    switch (operator) {
        case '+': 
            return a + b;
        case '-':
            return a - b;
        case '\u00D7':
            return a * b;
        case '\u00F7':
            return b !== 0 ? a / b : 'MathError: Division by Zero'; //division by 0
        default:
            return 0;

    }
}