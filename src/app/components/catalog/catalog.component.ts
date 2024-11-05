import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent {
  @Input() products!: Product[];
  @Output() productEventEmitter = new EventEmitter<Product>();

  onAddToCart(product: Product) {
    this.productEventEmitter.emit(product);
  }

  trackByProduct(index: number, product: Product): any { // Cambiamos el tipo de retorno a "any"
    return product.id; // Asegúrate de que "id" existe y tiene un valor único
  }
}
