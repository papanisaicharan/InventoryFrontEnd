import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Distributor } from '../models/distributor.model';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { Supplier } from '../models/supplier.model';


@Injectable({ providedIn: 'root' })
export class BackEndServices{

    constructor(private http: HttpClient) {}

    // suppliers
    getSuppliers(){
        return this.http.get<Supplier[]>('http://127.0.0.1:3000/suppliers');
    }

    createSupplier(supplier: Supplier){
        return this.http.post<Supplier>('http://127.0.0.1:3000/supplier/create', supplier);
    }

    // distributors
    getDistributors(){
        return this.http.get<Distributor[]>('http://127.0.0.1:3000/distributors');
    }

    createDistributor(distributor: Distributor){
        return this.http.post<Distributor>('http://127.0.0.1:3000/distributor/create', distributor);
    }

    // products
    getProducts(){
        return this.http.get<Product[]>('http://127.0.0.1:3000/products');
    }

    createProduct(product: Product){
        return this.http.post<Product>('http://127.0.0.1:3000/product/create', product);
    }

    // orders
    getOrders(){
        return this.http.get<Order[]>('http://127.0.0.1:3000/Orders');
    }

    createOrder(order: Order){
        return this.http.post<Order>('http://127.0.0.1:3000/Order/create', order);
    }
    
}