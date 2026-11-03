import { Component, computed, HostListener, inject, viewChildren } from '@angular/core';
import { CalculatorButton } from '../calculatorButton/calculatorButton';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  imports: [CalculatorButton],
  templateUrl: './calculator.html',
  styleUrls: [],
  styles: `

    // @reference "tailwindcss"
    // .is-command {
    //   @apply bg-indigo-700 bg-opacity-20 
    // }
  `,
   host: {
    '(document:keyup)': 'handleKeydown($event)' // esta linea es para que el host escuche los eventos de teclado y los pase al metodo handleKeydown a nivel glogal 
   }
})
export class Calculator {

  public calculartorButtons = viewChildren<CalculatorButton>(CalculatorButton)
  private calculatorService = inject(CalculatorService)



  // tradicional geter
  // get resultText(): any {
  //   return this.calculatorService.resultText();
  // }

  public resultText: any =  computed(() => {
    return this.calculatorService.resulText();
  })

  public subResultText: any =  computed(() => {
    return this.calculatorService.subResultText();
  })

  public lastOperator: any =  computed(() => {
    return this.calculatorService.lastOperator();
  })



  handleClcik(event: any) {
    console.log('Button clicked', event);
    this.calculatorService.constructNumber(event);
  }


  // @HostListener('document:keyup', ['$event'])
  handleKeydown(event: KeyboardEvent) {

    const keyEquivalents: Record<string, string> = {
      'Escape': 'C',
      'Enter': '=',
      // 'Backspace': '⌫',
      'Clear': 'C',
      '*': 'x',
      '/': '%',
      '-': '-',
      '+': '+',
    }

    const key = keyEquivalents[event.key] ?? event.key;
    console.log('Key pressed', key); 

    this.handleClcik(key);
    // console.log('Key pressed', key);
    this.calculartorButtons().forEach((button) => {
      button.keyBoardPress(key)
    });

  }

  // @HostListener('document:keyup', ['$event'])
  // handleKeydown(event: KeyboardEvent) {
  //   this.handleClcik(event.key);
  //   console.log('Key pressed', event.key);
  // }

}
