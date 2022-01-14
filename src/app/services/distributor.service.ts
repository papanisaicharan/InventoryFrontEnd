import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Distributor } from "../models/distributor.model";


@Injectable({ providedIn: 'root' })
export class DistributorService {

    distributorsChange = new Subject<Distributor[]>();

    private distributors: Distributor[] = [];

    constructor() { }

    // setter
    setDistributors(distributors: Distributor[]) {
        this.distributors = distributors;
        // sending the copy to all subscribers
        this.distributorsChange.next(this.distributors.slice());
    }

    // getter
    getdistributors() {
        return this.distributors.slice();
    }

    getDistributor(id: number) {
        // return this.distributors[id];
    }
}