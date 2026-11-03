import { Calculator } from '@/calculator/components/calculator/calculator';
import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator-view',
  imports: [Calculator],
  templateUrl: './calculatorComponent.html',
  styleUrl: './calculatorComponent.scss',
})
export default class CalculatorComponent {}
