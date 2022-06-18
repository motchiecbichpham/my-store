import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Order } from 'src/app/types/order';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  name: string = '';
  address: string = '';
  credit: string = '';
  totalPrice: number = 0;
  constructor(
    private cartService: CartService,
    private routerService: Router
  ) {}

  ngOnInit(): void {
    this.products = this.cartService.getProductsInCart();
    this.updatePrice();
  }
  updatePrice(product?: Product) {
    if (product?.quantity == 0) {
      this.removeProduct(product);
    }
    let total = 0;
    this.products.forEach(totalPriceCal);
    function totalPriceCal(item: Product) {
      total += item.quantity ? item.quantity * item.price : 0;
    }
    this.totalPrice = total;
  }
  removeProduct(product: Product) {
    this.products = this.products.filter((item) => item.id != product.id);
    this.cartService.setProductsInCart(this.products);
  }
  onSubmit() {
    const order: Order = {
      name: this.name,
      totalPrice: this.totalPrice,
      creditCardNumber: this.credit,
    };

    this.cartService.setOrder(order);
    this.routerService.navigate(['/confirmation']);

    this.name = '';
    this.address = '';
    this.credit = '';
    this.totalPrice = 0;
  }
}
