import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  quantity: number = 1;
  @Input() product: Product;
  @Output() addProduct: EventEmitter<Product> = new EventEmitter();
  constructor(private cartService: CartService) {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: '',
      quantity: 0,
    };
  }

  ngOnInit(): void {}
  submit(item: Product): void {
    item.quantity = Number(this.quantity);
    this.addProduct.emit(item);
    alert(`Added to cart: ${item.quantity} x ${this.product.name}`);
    this.cartService.addProduct(item);
    this.quantity = 1;
  }
}
