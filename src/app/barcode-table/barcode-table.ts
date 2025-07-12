import { Component, signal } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

interface ProductRow {
  barcode: string;
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-barcode-table',
  standalone: true,
  imports: [CommonModule, NgIf, MatTableModule, MatInputModule, FormsModule],
  templateUrl: './barcode-table.html',
  styleUrl: './barcode-table.scss'
})
export class BarcodeTable {
  rows = signal<ProductRow[]>([{ barcode: '', name: '', quantity: 0 }]);
  displayedColumns = ['barcode', 'name', 'quantity'];
  message = signal('');
  scanning = signal(false);

  async onBarcodeInput(barcode: string, index: number) {
    if (this.scanning()) return;
    const cleanBarcode = barcode.trim();
    if (!cleanBarcode) return;

    this.scanning.set(true);
    this.message.set('');

    if (this.isBarcodeExists(cleanBarcode, index)) {
      this.message.set(`ברקוד ${cleanBarcode} כבר סרוק קודם!`);
      this.scanning.set(false);
      return;
    }

    try {
      const product = await this.fakeApiCall(cleanBarcode);
      this.updateRow(index, product);
    } catch {
      this.message.set('שגיאה בטעינת מוצר');
    } finally {
      this.scanning.set(false);
    }
  }

  isBarcodeExists(barcode: string, currentIndex: number): boolean {
    return this.rows().some(
      (row, i) =>
        row.barcode === barcode && i !== currentIndex && barcode !== ''
    );
  }

  updateRow(index: number, product: { name: string; quantity: number }) {
    const rowsCopy = [...this.rows()];
    rowsCopy[index] = {
      barcode: rowsCopy[index].barcode,
      name: product.name,
      quantity: product.quantity,
    };

    if (index === rowsCopy.length - 1) {
      rowsCopy.push({ barcode: '', name: '', quantity: 0 });
    }

    this.rows.set(rowsCopy);
  }

  fakeApiCall(barcode: string): Promise<{ name: string; quantity: number }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (barcode === '0000') {
          reject('Invalid barcode');
        } else {
          resolve({ name: 'Product ' + barcode, quantity: 1 });
        }
      }, 500);
    });
  }
}
