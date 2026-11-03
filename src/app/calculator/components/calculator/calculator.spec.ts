import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Calculator } from "./calculator";
import { signal } from "@angular/core";
import { vi } from "vitest";
import { CalculatorService } from "@/calculator/services/calculator.service";
import { By } from "@angular/platform-browser";
import { CalculatorButton } from "../calculatorButton/calculatorButton";

class MockCalculatorService {
    public resulText = signal('100');
    public subResultText = signal('20')
    public lastOperator = signal('-')
    public constructNumber = vi.fn(); // vi fuction mock para simular el metodo constructNumber del servicio, funcion ficticia que se puede espiar y verificar si fue llamada 
}

describe('CalculatorComponent', () => {

    let component: Calculator;
    let fixture: ComponentFixture<Calculator>;
    let mockCalculatorService: MockCalculatorService;

    beforeEach(async () => {
        mockCalculatorService = new MockCalculatorService();
        await TestBed.configureTestingModule({
            imports: [Calculator],
            providers: [
                { provide: CalculatorService, useValue: mockCalculatorService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(Calculator);
        component = fixture.componentInstance;
        fixture.detectChanges(); // importante si recibe inputs value  y detecta los cambios
    });

    it('should create', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        // console.log('compiled', compiled.innerHTML);
        console.log('result ', { result: component.resultText(), subResult: component.subResultText(), lastOperator: component.lastOperator() })
        expect(component).toBeTruthy();

    });

    it('should have initial values from service', () => {
        
        expect(component.resultText()).toBe('100');
        expect(component.subResultText()).toBe('20');
        expect(component.lastOperator()).toBe('-');


    });

    it('should display values in the template', () => {
        mockCalculatorService.resulText.set('200');
        mockCalculatorService.subResultText.set('50');
        mockCalculatorService.lastOperator.set('-');
        fixture.detectChanges(); // detecta los cambios para que se aplique 

        const compiled = fixture.nativeElement as HTMLElement;
        const resultElement = compiled.querySelector('[test-id="result"]') as HTMLElement;
        // console.log('resultElement', { resultElement, textContent: resultElement.textContent });
        expect(resultElement.textContent).toBe('200');


        const subResultElement = compiled.querySelector('.text-4xl') as HTMLElement;
        // console.log('subResultElement', { subResultElement, textContent: subResultElement?.textContent });
        expect(subResultElement.textContent?.trim()).toBe('50 -');
    });

    it('should call constructNumber when handleClick is called', () => {
        component.handleClcik('5');
        expect(mockCalculatorService.constructNumber).toHaveBeenCalled();
        expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('5');
    });

    it('should handle keyboard events correctly', () => {
        const event = new KeyboardEvent('keyup', { key: '1' });
        document.dispatchEvent(event);
        expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('1');
    });

    it('should handle special keyboard events (Enter -> =)', () => {
        const event = new KeyboardEvent('keyup', { key: 'Enter' });
        document.dispatchEvent(event);
        expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');
    });

    it('should handle special keyboard events (Escape -> C)', () => {
        const event = new KeyboardEvent('keyup', { key: 'Escape' });
        document.dispatchEvent(event);
        expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
    });

    it('should call constructNumber when button is clicked', () => {
        // Describe el propósito del test: verificar que constructNumber se llama al hacer clic en un botón
        
        /**
         * Retrieves all CalculatorButton directive instances from the fixture's debug element.
         * Uses Angular's By.directive() to query the DOM and find every element that has the CalculatorButton directive applied.
         * Returns a DebugElement array containing references to all matched button components.
         * This is typically used in unit tests to access and interact with calculator button elements programmatically.
         */
        // Obtiene todos los elementos del DOM que tengan la directiva CalculatorButton aplicada
        const buttons = fixture.debugElement.queryAll(
            By.directive(CalculatorButton)
        );
        // Imprime en consola la cantidad de botones encontrados para debugging
        console.log('buttons', buttons.length)
        // Almacena el primer botón de la lista en una variable para usarlo posteriormente
        const button = buttons[0];
        // Simula un evento de clic en el primer botón y pasa 'C' como parámetro del evento
        button.triggerEventHandler('onclick', 'C');
        // Verifica que el método constructNumber haya sido llamado con el argumento 'C'
        expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
        // Verifica que existan exactamente 19 botones en total en el componente
        expect(buttons.length).toBe(19);
        // Itera sobre cada botón encontrado para hacer clic en cada uno
        buttons.forEach(element => {
            // Obtiene el elemento HTML nativo del botón actual
            const buttonElement = element.nativeElement as HTMLElement;
            // Simula un evento de clic en el botón actual y pasa su contenido de texto como parámetro
            button.triggerEventHandler('onclick', buttonElement.textContent?.trim());
            // Verifica que constructNumber haya sido llamado con el texto del botón (sin espacios en blanco)
            expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith(buttonElement.textContent?.trim());
        });
    });

    it('should update resultText signal when service updates', () => {
        // todo:
        mockCalculatorService.resulText.set('300');
        fixture.detectChanges();
        expect(component.resultText()).toBe('300');
    });

    it('should have 19 calculator-button components with content projected', () => {
        // todo:
        const buttons = fixture.nativeElement as HTMLElement;
        const buttonElements = buttons.querySelectorAll('app-calculator-button');
        console.log('buttonElements',{ buttonElements:  buttonElements.length});
        expect(buttonElements.length).toBe(19);
        buttonElements.forEach(element => {
            const buttonContent = element.textContent?.trim();
            console.log('buttonContent', { buttonContent });
            expect(buttonContent).not.toBe('');
            expect(buttonContent).not.toBeNull();
            expect(buttonContent).not.toBeUndefined();
            expect(buttonContent).not.toBe(' ');
            expect(buttonContent).not.toBe('\n');
            expect(buttonContent).not.toBe('\t');
            expect(buttonContent).toContain(element.textContent?.trim())
        });

    });



})
