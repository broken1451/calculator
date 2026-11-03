import { Component, ElementRef, HostBinding, input, OnInit, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-calculator-button',
  imports: [],
  templateUrl: './calculatorButton.html',
  styleUrls: ['./calculatorButton.scss'],
  host: {
     class: 'w-1/4 border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isEqual()'
  }
})
export class CalculatorButton implements OnInit {

  public onclick = output<string>();
  public contenValue = viewChild<ElementRef<HTMLButtonElement>>('button', {})

  public isPressed = signal(false)


  public isComand = input(false, {
    transform: (value: boolean | string) => {
      console.log('transform', value, typeof value);
      return typeof value === 'string' ? value === '' : value
    }
  })

  public isEqual = input(false, {
    transform: (value: boolean | string) => {
      console.log('transform', value, typeof value);
      return typeof value === 'string' ? value === '' : value
    }
  })


  ngOnInit(): void {
    console.log('isComand', this.isComand());

  }

  @HostBinding('class.is-command')
  get isCommandClass() {
    return this.isComand();
  }
  // @HostBinding('class.w-2/4')
  // get isEqualClass() {
  //   return this.isEqual();
  // }

  showEqual(event: any){
    return this.isEqual();
  }


  click() {
    if (!this.contenValue()?.nativeElement.textContent || !this.contenValue()?.nativeElement.innerHTML) {
      return;
    }

    const value = this.contenValue()!.nativeElement.textContent || this.contenValue()!.nativeElement.innerHTML
    this.onclick.emit(value.trim());
  }


  public keyBoardPress(key: string) {

    if (!this.contenValue()) {
      return;
    }


    const value = this.contenValue()!.nativeElement.textContent || this.contenValue()!.nativeElement.innerHTML

    if (value.trim() !== key) {
      return;
    }

    this.isPressed.set(true);
    setTimeout(() => {
      this.isPressed.set(false);
    }, 200);

  }


}
