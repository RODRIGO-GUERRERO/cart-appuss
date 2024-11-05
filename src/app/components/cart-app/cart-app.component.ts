import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Product } from '../../models/product';
import { CartItem } from '../../models/cart-item';
import { CatalogComponent } from '../catalog/catalog.component';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CommonModule, CatalogComponent, CartComponent],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  products: Product[] = [];
  items: CartItem[] = [];
  total: number = 0;

  constructor(private service: ProductoService) {}

  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || []; // Recuperar carrito de Session Storage
    this.calculateTotal();  
  }

  onAddCart(product: Product) {
    const hasItem = this.items.find((item) => item.product.id === product.id);
    if (hasItem) {
      this.items = this.items.map((item) => {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }
        return item;
      });
    } else {
      this.items = [...this.items, { product: { ...product }, quantity: 1 }];
    }
    this.calculateTotal(); // Actualizamos el total después de agregar
    this.saveSession(); // Guardar el estado en Session Storage
  }

  onDeleteCart(id: number) {  
    this.items = this.items.filter((item) => item.product.id !== id);
    this.calculateTotal(); // Llamada a calculateTotal para actualizar después de eliminar
    this.saveSession(); // Guardar el estado en Session Storage
  }

  calculateTotal(): void { 
    this.total = this.items.reduce((total, item) => total + item.product.price * item.quantity, 0); 
  }

  /**
   * Guarda el carrito de compras en el session storage del navegador.
   */
  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
