import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Supplier } from "../models/supplier.model";


@Injectable({ providedIn: 'root' })
export class SupplierService {

    suppliersChange = new Subject<Supplier[]>();

    private suppliers: Supplier[] = [];

    constructor() { }

    // setter
    setSuppliers(suppliers: Supplier[]) {
        this.suppliers = suppliers;
        // sending the copy to all subscribers
        this.suppliersChange.next(this.suppliers.slice());
    }

    // getter
    getSuppliers() {
        return this.suppliers.slice();
    }

    getSupplier(id: number) {
        // return this.suppliers[id];
    }
}