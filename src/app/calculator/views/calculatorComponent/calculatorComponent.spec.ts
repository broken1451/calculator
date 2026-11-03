
import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorComponent from './calculatorComponent';
import { Component } from '@angular/core';

// mock
@Component({
    selector: 'calculator',
    template: '<div>Mock Calculator Component</div>'
})
class MockCalculatorComponent { }

describe('CalculatorComponent', () => {

    let component: CalculatorComponent;
    let fixture: ComponentFixture<CalculatorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CalculatorComponent],
        }).overrideComponent(CalculatorComponent, {
            set: {
                imports: [MockCalculatorComponent]
            }
        }).compileComponents();

        fixture = TestBed.createComponent(CalculatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // importante si recibe inputs value  y detecta los cambios
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render  the calculator  component', () => {

        const compiled = fixture.nativeElement as HTMLElement;
        const calculatorComponent = compiled.querySelector('calculator');
        // console.log('all html ', compiled?.innerHTML);
        // console.log('all calculatorComponent ', calculatorComponent?.innerHTML);
        expect(calculatorComponent).toBeTruthy();

    });


    it('should contain the specific css class in div', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const divElement = compiled.querySelector('div');
        const classes = 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ');
        classes.forEach(className => {
            expect(divElement?.classList.contains(className)).toBeTruthy();
            expect(classes).toContain(className);
        });
    });

});