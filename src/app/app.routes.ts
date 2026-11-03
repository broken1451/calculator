import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'calculator',
        loadComponent: () => import('@/calculator/views/calculatorComponent/calculatorComponent')
    },
    {
        path: '**',
        redirectTo: 'calculator'
    }
];
