import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Supplier } from 'src/app/models/supplier.model';
import { BackEndServices } from 'src/app/services/Backend.service';
import { ProductService } from 'src/app/services/product.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss']
})
export class CreateProductsComponent implements OnInit {

  createProductFormGroup: FormGroup;
  suppliers: Supplier[] = [];
  
  constructor(private route: ActivatedRoute, private supplierService: SupplierService,
    private backendService: BackEndServices, private productService: ProductService) { 
    this.createProductFormGroup = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      productDescription: new FormControl('', [Validators.required]),
      units: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      supplierId: new FormControl('', [Validators.required]),
      perUnitPrice: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.backendService.getSuppliers().subscribe(suppliers => {
      this.suppliers = suppliers;
    })
    this.supplierService.suppliersChange.subscribe(suppliers => {
      this.suppliers = suppliers;
      console.log(this.suppliers);
    })
  }

  onSubmit(){
    this.backendService.createProduct(this.createProductFormGroup.value).subscribe({
      next: response => {
        this.getProducts();
      },
      error: error => {
        console.log("error occured while creating products..!");
      }
    })
  }

  getProducts(){
    this.backendService.getProducts().subscribe(products => {
      this.productService.setProducts(products);
    });
  }

}
