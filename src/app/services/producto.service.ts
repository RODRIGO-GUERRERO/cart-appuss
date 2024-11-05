import { Injectable } from '@angular/core';
import { products } from '../data/producto.data'; // Verifica que la ruta sea correcta
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor() {}

  findAll(): Product[] {
    return products; // Asegúrate de que este arreglo contenga los productos
  }
}
