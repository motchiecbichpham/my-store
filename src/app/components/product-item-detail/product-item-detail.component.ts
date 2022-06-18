import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  product!: Product;
  products: Product[] = [];
  quantity: number = 1;
  @Output() addProduct: EventEmitter<Product> = new EventEmitter();

  constructor(
    private routeService: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    try {
      this.routeService.params.subscribe((params) => {
        this.productService.getProducts().subscribe((data) => {
          this.products = data;
          let foundProduct: Product | undefined = this.products.find(
            (item) => item.id.toString() === params['id']
          );
          if (foundProduct) {
            this.product = foundProduct;
          }
        });
      });
    } catch (error) {
      throw new Error('New error');
    }
  }
  submit(item: Product): void {
    item.quantity = Number(this.quantity);
    this.addProduct.emit(item);
    alert(`Added to cart: ${item.quantity} x ${this.product.name}`);
    this.cartService.addProduct(item);
    this.quantity = 1;
  }
}
