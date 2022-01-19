import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { FilterResponse } from '../models/filterResponse.model';
import { Order } from '../models/order.model';
import { BackEndServices } from '../services/Backend.service';
import { DistributorService } from '../services/distributor.service';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  task: String = 'Create';
  result: number = 0;
  total: number = 0;
  searchFormGroup: FormGroup;

  constructor(private router: Router, private distributorService: DistributorService, private productService: ProductService,
    private backendService: BackEndServices, private orderService: OrderService){
    this.searchFormGroup = new FormGroup({
      'searchControl': new FormControl('', [])
    });
  }

  ngOnInit(): void {
    // any change in orders, gather them
    this.orderService.ordersChange.subscribe(orders => {
      this.orders = orders;
    });
    // get orders
    this.getOrders(this.searchFormGroup.get('searchControl')?.value);
    this.searchFormGroup.get('searchControl')?.valueChanges.subscribe(value => {
      console.log(value);
      this.getOrders(value);
    })
  }

  getOrders(searchTerm: String){
    this.backendService.getOrders(searchTerm).subscribe((filterResponse: any) => {
      this.orders = filterResponse.orders;
      this.result = filterResponse.result;
      this.total = filterResponse.total;
      this.orderService.setOrders(filterResponse.orders);
    });
  }

  onEdit(order: Order){
    // On click of edit, set the values for the form.
    this.router.navigate(['/order/edit'], { state: order });
  }

  onDelete(order: Order){
    // on click of delete, delete the order by Id and update the list (also reset the form for update on in stock products)
    this.backendService.deleteOrder(order.orderId).subscribe( {
        next: response =>{
          this.getOrders(this.searchFormGroup.get('searchControl')?.value);
    },
    error: error => {
      console.log(error);
    }
  });
  }

}
