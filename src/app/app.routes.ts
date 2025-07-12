import { Routes } from '@angular/router';
import { BarcodeTable } from './barcode-table/barcode-table';


export const routes: Routes = [
  {
    path: '',
    // component: BarcodeTable
    loadComponent: () =>
      import('./barcode-table/barcode-table').then(m => m.BarcodeTable)
  },
  
//   {
//     path: 'dynamic-table',
//     component: BarcodeTable
//   }
];