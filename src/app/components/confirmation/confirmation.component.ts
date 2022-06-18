import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Order } from 'src/app/types/order';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  order!: Order;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.order = this.cartService.getOrder();
  }
}
