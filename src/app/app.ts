import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
   readonly title = signal('zonelessCalculator');
   public readonly title2 = signal('zonelessCalculator2');
  //  protected readonly title = signal('zonelessCalculator');

  method1(){
    console.log('method1');
  }

 private method2(){

  }
}
