import { Component, signal } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BarcodeService } from '../services/barcode';
import { HttpClientModule } from '@angular/common/http';

interface ProductRow {
  barcode: string;
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-barcode-table',
  standalone: true,
  imports: [CommonModule, NgIf, MatTableModule, MatInputModule, FormsModule, HttpClientModule ],
  templateUrl: './barcode-table.html',
  styleUrl: './barcode-table.scss'
})
export class BarcodeTable {
  rows = signal<ProductRow[]>([
    { barcode: '', name: '', quantity: 0 },
  ]);

  displayedColumns: string[] = ['barcode', 'name', 'quantity'];
  message = signal('');

  constructor(private barcodeService: BarcodeService) {}


  onBarcodeInput(barcode: string, index: number) {
    const currentRows = this.rows();

    const existingIndex = currentRows.findIndex(r => r.barcode === barcode);
    if (existingIndex !== -1 && existingIndex !== index) {
      this.message.set('ברקוד כבר קיים!');
      return;
    }

    this.barcodeService.getProductByBarcode(barcode).subscribe({
      next: (result) => {
        currentRows[index] = { barcode, name: result.name, quantity: result.quantity };
        this.rows.set([...currentRows]);

        if (index === currentRows.length - 1) {
          this.rows.set([...this.rows(), { barcode: '', name: '', quantity: 0 }]);
        }

        this.message.set('');
      },
      error: () => {
        this.message.set('מוצר לא נמצא');
      }
    });
  }

  //אם תעבור ל־API אמיתי — תחליף את fakeApiCall בשירות HttpClient
  // fakeApiCall(barcode: string): Promise<ProductRow> {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (barcode === '12345') {
  //         resolve({
  //           barcode,
  //           name: 'קולה 1.5 ליטר',
  //           quantity: 1,
  //         });
  //       } else if (barcode === '67890') {
  //         resolve({
  //           barcode,
  //           name: 'במבה 80 גרם',
  //           quantity: 1,
  //         });
  //       } else {
  //         reject('לא נמצא');
  //       }
  //     }, 500);
  //   });
  // }
}