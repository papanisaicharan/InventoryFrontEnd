import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Product } from "../models/product.model";


@Injectable({ providedIn: 'root' })
export class ProductService {

    productsChange = new Subject<Product[]>();

    private products: Product[] = [];

    constructor() { }

    // setter
    setProducts(products: Product[]) {
        this.products = products;
        // sending the copy to all subscribers
        this.productsChange.next(this.products.slice());
    }

    // getter
    getproducts() {
        return this.products.slice();
    }

    getProduct(id: number) {
        // return this.products[id];
    }
}