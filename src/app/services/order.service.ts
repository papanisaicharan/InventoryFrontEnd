import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Order } from "../models/order.model";


@Injectable({ providedIn: 'root' })
export class OrderService {

    ordersChange = new Subject<Order[]>();

    private orders: Order[] = [];

    constructor() { }

    // setter
    setOrders(orders: Order[]) {
        this.orders = orders;
        // sending the copy to all subscribers
        this.ordersChange.next(this.orders.slice());
    }

    // getter
    getorders() {
        return this.orders.slice();
    }

    getOrder(id: number) {
        // return this.orders[id];
    }
}