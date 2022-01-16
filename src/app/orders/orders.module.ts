import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from '../orders/orders.component';
import { CreateOrdersComponent } from './create-orders/create-orders.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersRoutingModule } from './orders-routing.module';
import { UpdateOrdersComponent } from './update-orders/update-orders.component';



@NgModule({
  declarations: [
    OrdersComponent,
    CreateOrdersComponent,
    UpdateOrdersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
