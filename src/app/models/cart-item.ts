import { Product } from "./product"; 

export class CartItem {
    quantity: number = 0; // Corrige la propiedad a 'quantity'
    product!: Product; // Asegúrate de que esto esté bien definido
}
