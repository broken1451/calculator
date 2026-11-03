import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButton } from './calculatorButton';
import { vi } from 'vitest';



@Component({
    imports: [CalculatorButton],
    template: `<app-calculator-button><span class="test-content" >6</span></app-calculator-button>`,
})
class TestHostComponent { }

describe('CalculatorButton', () => {

    let component: CalculatorButton;
    let fixture: ComponentFixture<CalculatorButton>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CalculatorButton],
        }).compileComponents();

        fixture = TestBed.createComponent(CalculatorButton);
        component = fixture.componentInstance;
        fixture.detectChanges(); // importante si recibe inputs value  y detecta los cambios
    });


    it('should create', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(component).toBeTruthy();
    });


    it('should apply w-1/4 double size is false', () => {
        const hostCssElement = fixture.nativeElement as HTMLElement;
        const hostCss = hostCssElement.classList.value;
        // console.log('hostCss', {hostCss});
        expect(hostCss).toContain('w-1/4');
    });

    it('should apply w-2/4 double size is true', () => {

        // hacemos un cambio fisico en el input isEqual para que se aplique la clase w-2/4
        fixture.componentRef.setInput('isEqual', true); // referencia del componente y setea el input isEqual a true
        fixture.detectChanges(); // detecta los cambios para que se aplique la clase w-2/4

        const hostCssElement = fixture.nativeElement as HTMLElement;
        const hostCss = hostCssElement.classList.value;
        // console.log('hostCss', {hostCss});
        expect(hostCss).toContain('w-2/4');
    });

    it('should apply is-command class when isCommand is true', () => {
        fixture.componentRef.setInput('isComand', true); // referencia del componente y setea el input isEqual a true
        fixture.detectChanges(); // detecta los cambios para que se aplique la clase w-2/4

        const hostCssElement = fixture.nativeElement as HTMLElement;
        const hostCss = hostCssElement.classList.value;
        //  console.log('hostCss', {hostCss});
        expect(hostCss).toContain('is-command');
    });

    it('should emit onClick when handleClick is called', () => {

        const spy = vi.spyOn(component.onclick, 'emit');
        const btnelement = (fixture.nativeElement as HTMLElement).querySelector('button')!;
        btnelement.textContent = ' 9 '; // setea el contenido del boton a 9 
        btnelement.click(); // simula el click en el boton
        expect(btnelement).toBeTruthy();
        expect(spy).toHaveBeenCalled(); // espera que se haya llamado al metodo emit
        expect(spy).toHaveBeenCalledWith('9'); // espera que se haya llamado al metodo emit con el valor 9

    });


    it('should set isPressed to true and then false when keyboardPressedStyle is called with matching key', async (done) => {
        // const btnelement = (fixture.nativeElement as HTMLElement).querySelector('button')!;
        // btnelement.textContent = ' 9 '; // setea el contenido del boton a 9 
        // lo de arriba es simimilar o otra manera de hacer lo mismo que la linea de abajo
        component.contenValue()!.nativeElement.textContent = '9'; // setea el contenido del boton a 9
        component.keyBoardPress('9'); // simula la presion de la tecla 9

        expect(component.isPressed()).toBe(true);
        expect(component.isPressed()).toBeTruthy();

        await new Promise((resolve) => setTimeout(resolve, 250)); // espera más de 200ms (el timeout del componente)
        console.log('isPressed after timeout', { pressed: component.isPressed() })
        expect(component.isPressed()).toBe(false);

    });

    it('should NOT set isPressed if key does not match', () => {
        component.contenValue()!.nativeElement.textContent = '9'; // setea el contenido del boton a 9
        component.keyBoardPress('8'); // simula la presion de la tecla 8

        expect(component.isPressed()).toBe(false);
    });

    it('should display projected content', () => {
        const hostComponentFixture = TestBed.createComponent(TestHostComponent);
        hostComponentFixture.detectChanges();

        const compiled = hostComponentFixture.nativeElement as HTMLElement;
        const projectedContent = compiled.querySelector('.test-content');
        console.log('all html ', { compiled: projectedContent?.innerHTML });
        expect(projectedContent).toBeTruthy();
        expect(projectedContent?.textContent).toBe('6');
        expect(projectedContent?.classList.contains('test-content')).toBe(true);
        expect(projectedContent?.textContent.trim()).toBe('6');


    });


})
