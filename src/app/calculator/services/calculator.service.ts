import { Service, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
// const operators = ['+', '-', 'x', '/', '÷'];
const operators = ['+', '-', 'x', '*', '/', '÷'];
const specialOperators = [
    '+/-',
    '%',
    '.',
    '=',
    'C',
    'Backspace',
];

@Service()
export class CalculatorService {

    public resulText = signal('0')
    public subResultText = signal('0')
    public lastOperator = signal('+')


    public constructNumber(value: string) {

        // validar input
        if (![...numbers, ...operators, ...specialOperators].includes(value)) {
            console.log('Invalid input:', value);
            return;
        }

        // = 
        if (value === '=') {
            console.log('Calculate result');
            this.calculateResult();
            return;
        }

        // C
        if (value === 'C') {
            console.log('Clear');
            this.resulText.set('0');
            this.subResultText.set('0');
            this.lastOperator.set('+');
            return;
        }

        // Backspace
        if (value === 'Backspace') {
            console.log('Backspace');

            if (this.resulText() === '0') {
                return;
            }
            // if (this.resulText() === '-0') {
            //     this.resulText.set('0');
            //     return;
            // }

            if (this.resulText().includes('-') && this.resulText().length === 2) {
                this.resulText.set('0');
                return;
            }

            if (this.resulText().length === 1) {
                this.resulText.set('0');
                return;
            }


            this.resulText.update((prev) => prev.slice(0, -1));
            return;
        }

        // oepradores
        if (operators.includes(value)) {
            //  this.calculateResult();
            this.lastOperator.set(value);
            this.subResultText.set(this.resulText());
            this.resulText.set('0');
            return;
        }

        // limitar carateres
        if (this.resulText().length >= 10) {
            console.log('Max length reached');
            return;
        }

        // validar . decimal
        if (value === '.' && !this.resulText().includes('.')) {
            if (this.resulText() === '0' || this.resulText() == '') {
                this.resulText.set('0.');
                return;
            }
            this.resulText.update((prev) => prev + '.');
            return;
        }


        // manejos del 0 inicial
        if (value === '0' && (this.resulText() === '0' || this.resulText() === '-0')) {

            return;
        }

        // cambiar signo
        if (value === '+/-') {
            if (this.resulText().startsWith('-')) {
                this.resulText.update((prev) => prev.slice(1));
                return
            }
            this.resulText.update((prev) => '-' + prev);
            return;
        }

        // numeros
        if (numbers.includes(value)) {
            if (this.resulText() === '0') {
                this.resulText.set(value);
                return;
            }

            if (this.resulText() === '-0') {
                this.resulText.set('-' + value);
                return;
            }
            // if (this.resulText() === '0' || this.resulText() === '-0') {
            //     if (this.resulText().includes('-')) {
            //         this.resulText.set('-' + value);
            //         return;
            //     }

            //     this.resulText.set(value);
            //     return;
            // }

            this.resulText.update((prev) => prev + value);
            return;
        }
    }


    public calculateResult() {

        const num1 = parseFloat(this.subResultText());
        const num2 = parseFloat(this.resulText());
        let result: number  = 0;

        switch (this.lastOperator()) {
            case '+':
                result = (num1 + num2);
                break;
            case '-':
                result = (num1 - num2);
                break;
            case 'x':
                result = (num1 * num2);
                break;
            case '/':
                if (num2 === 0) {
                    console.error('Division by zero');
                    this.resulText.set('Error');
                    return;
                }
                result = (num1 / num2);
                break;
            case '÷':
                if (num2 === 0) {
                    console.error('Division by zero');
                    this.resulText.set('Error');
                    return;
                }
                result = (num1 / num2);
                break;
            default:
                console.error('Unknown operator:', this.lastOperator());
                return;
        }

        this.resulText.set(result.toString());
        this.subResultText.set('0');
        // this.lastOperator.set('+');
    }

}
