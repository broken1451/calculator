import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { vi } from 'vitest';

describe('CalculatorService ', () => {

    let service: CalculatorService

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CalculatorService);
        vi.resetAllMocks(); // Reset all mocks before each test
        // vi.clearAllMocks(); // Clear all mocks before each test
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be created with default values', () => {
        expect(service.resulText()).toBe('0');
        expect(service.subResultText()).toBe('0');
        expect(service.lastOperator()).toBe('+');
    });

    it('should set resultText, subResultText to "0" when C is pressed', () => {

        service.resulText.set('123');
        service.subResultText.set('456');
        service.lastOperator.set('-');

        service.constructNumber('C');
        expect(service.resulText()).toBe('0');
        expect(service.subResultText()).toBe('0');
        expect(service.lastOperator()).toBe('+');
        service.constructNumber('1');
    });

    it('should update resultText with number input', () => {
        service.constructNumber('1');
        service.constructNumber('2');
        service.constructNumber('3');
        console.log('resultText after input:', service.resulText());
        expect(service.resulText()).toBe('123');
    });

    it('should handle operators correctly', () => {
        service.resulText.set('12345');
        service.constructNumber('-');

        expect(service.resulText()).toBe('0');
        expect(service.lastOperator()).toBe('-');

        service.resulText.set('12');
        service.constructNumber('*');
        expect(service.resulText()).toBe('0');
        expect(service.lastOperator()).toBe('*');
    });

    it('should handle operators correctly', () => {
        const operators = ['+', '-', 'x', '*', '/', '÷'];
        operators.forEach(element => {
            service.resulText.set('12345');
            service.constructNumber(element);
            expect(service.resulText()).toBe('0');
            expect(service.lastOperator()).toBe(element);
        });
    });

    it('should calculate result correctly for addition', () => {
 
         service.resulText.set('1');
         service.constructNumber('+');
         service.resulText.set('2');
         service.constructNumber('=');
         expect(service.resulText()).toBe('3');

    });

    it('should calculate result correctly for subtraction', () => {
         service.resulText.set('3');
         service.constructNumber('-');
         service.resulText.set('2');
         service.constructNumber('=');
         expect(service.resulText()).toBe('1');
    });

    it('should calculate result correctly for multiplication', () => {
       
         service.resulText.set('3');
         service.constructNumber('x');
         service.resulText.set('2');
         service.constructNumber('=');
         expect(service.resulText()).toBe('6');
    });

    it('should calculate result correctly for division', () => {
     
         service.resulText.set('10');
         service.constructNumber('/');
         service.resulText.set('2');
         service.constructNumber('=');
         expect(service.resulText()).toBe('5');
    });

    it('should handle decimal point correctly', () => {

        service.constructNumber('1');
        service.constructNumber('2');
        service.constructNumber('.');
        service.constructNumber('3');
        expect(service.resulText()).toBe('12.3');
    });

    it('should handle decimal point starting with 0', () => {

        service.constructNumber('.');
        service.constructNumber('5');
        expect(service.resulText()).toBe('0.5');
    });

    it('should handle sign change +/-', () => {
        service.resulText.set('5');
        service.constructNumber('+/-');
        expect(service.resulText()).toBe('-5');
        service.constructNumber('+/-');
        expect(service.resulText()).toBe('5');
    });

    it('should handle backspace', () => {
        service.resulText.set('123');
        service.constructNumber('Backspace');
        expect(service.resulText()).toBe('12');
    });

    it('should handle backspace with negative numbers', () => {
        service.resulText.set('-12');
        service.constructNumber('Backspace');
        expect(service.resulText()).toBe('-1');
        service.constructNumber('Backspace');
        expect(service.resulText()).toBe('0');
    });

    it('should handle max length with number valid', () => {
      
        for (let i = 0; i < 10; i++) {
            service.constructNumber("1");
        }
        // console.log('currentValue.length', service.resulText().length );
        expect(service.resulText().length).toBe(10);
    });

    it('should handle max length with number in for', () => {

        const spyConsoleLog = vi.spyOn(console, 'log');
        spyConsoleLog.mockImplementation(() => { 
            // console.warn('console.log is mocked');
        }); // esto afecta a la consola, no se mostrará nada en la consola durante la prueba y las pruebas q le siguen 
      
        let currentValue = 0;
        for (let i = 0; i < 20; i++) {
            currentValue = i;
            service.constructNumber(currentValue.toString());
        }
        // console.log('currentValue.length 2 ', service.resulText().length );
        expect(service.resulText().length).toBe(9);
        expect(spyConsoleLog).toHaveBeenCalled();
        expect(spyConsoleLog).toHaveBeenCalledTimes(10);
    });

    it('should handle invalid input', () => {
        const spyConsoleLog = vi.spyOn(console, 'log');
        spyConsoleLog.mockImplementation(() => { 
            // console.warn('console.log is mocked');
        }); // esto afecta a la consola, no se mostrará nada en la consola durante la prueba y las pruebas q le siguen 

        service.constructNumber('ABC');
        expect(service.resulText()).toBe('0');
        expect(spyConsoleLog).toHaveBeenCalled();
        expect(spyConsoleLog).toHaveBeenCalledWith('Invalid input:' , 'ABC');

    });

    it('should handle negative zero input correctly', () => {
   
        service.resulText.set('-0');
        service.constructNumber('Backspace');
        expect(service.resulText()).toBe('0');
    });

})
