import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrdersComponent } from './create-orders/create-orders.component';
import { OrdersComponent } from './orders.component';
import { UpdateOrdersComponent } from './update-orders/update-orders.component';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'order/edit',
    component: UpdateOrdersComponent
  },
  {
    path: 'order/create',
    component: CreateOrdersComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {
}
