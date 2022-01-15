import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../models/order.model';
import { BackEndServices } from '../services/Backend.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];

  constructor(private route: ActivatedRoute, private backendService: BackEndServices, private orderService: OrderService){

  }

  ngOnInit(): void {
    this.orderService.ordersChange.subscribe(orders => {
      this.orders = orders;
    })

    this.backendService.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
      this.orderService.setOrders(orders);
    });
  }

}
