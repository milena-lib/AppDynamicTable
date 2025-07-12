import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarcodeTable } from './barcode-table/barcode-table';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], //, BarcodeTable
  templateUrl: './app.html',
  styleUrl: './app.scss'
  
})
export class App {
  protected readonly title = signal('AppDynamicTable');
  
}
