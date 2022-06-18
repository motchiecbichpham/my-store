import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../types/product';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    url: '',
    description: '',
    quantity: 0,
  };
  products: Product[] = [];
  constructor(private http: HttpClient) {}
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('../../assets/data.json');
  }
  setProducts(products: Product[]) {
    this.products = products;
  }
}
