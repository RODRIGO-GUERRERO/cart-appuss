import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { CartItem } from '../../models/cart-item'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CommonModule], // Agrega CommonModule aquí
  templateUrl: './cart.component.html',
})
export class CartComponent {
  @Input() items: CartItem[] = [];
  @Input() total: number = 0;

  @Output() idProductEventEmitter = new EventEmitter<number>();

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

  // Agrega el método trackByProduct para evitar el error
  trackByProduct(index: number, item: CartItem): number {
    return item.product.id; // Usa el ID del producto como referencia única
  }
}