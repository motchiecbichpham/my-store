import { Injectable } from '@angular/core';
import { Order } from '../types/order';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  productsInCart: Product[] = [];
  order: Order = {
    name: '',
    totalPrice: 0,
    creditCardNumber: '',
  };
  constructor() {}

  addProduct(product: Product) {
    console.log(product);

    const exitedProduct = this.productsInCart.find(
      (item) => item.id === product.id
    );
    if (exitedProduct?.quantity && product.quantity) {
      exitedProduct.quantity += product.quantity;
    } else {
      this.productsInCart.push(product);
    }
  }

  getProductsInCart(): Product[] {
    return this.productsInCart;
  }
  setProductsInCart(products: Product[]) {
    this.productsInCart = products;
  }
  getOrder(): Order {
    return this.order;
  }
  setOrder(order: Order) {
    this.order = order;
    this.productsInCart = [];
  }
}
