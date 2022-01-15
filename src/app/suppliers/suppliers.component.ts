import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Supplier } from '../models/supplier.model';
import { BackEndServices } from '../services/Backend.service';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {

  suppliers: Supplier[] = [];

  constructor(private route: ActivatedRoute, private backendService: BackEndServices, private supplierService: SupplierService){

  }

  ngOnInit(): void {
    this.supplierService.suppliersChange.subscribe(suppliers => {
      this.suppliers = suppliers;
    })

    this.backendService.getSuppliers().subscribe((suppliers: Supplier[]) => {
      this.suppliers = suppliers;
      this.supplierService.setSuppliers(suppliers);
    });
  }

  // editSupplier(supplier: Supplier){

  // }

}
