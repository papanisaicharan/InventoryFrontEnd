import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Distributor } from 'src/app/models/distributor.model';
import { Product } from 'src/app/models/product.model';
import { BackEndServices } from 'src/app/services/Backend.service';
import { DistributorService } from 'src/app/services/distributor.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-orders',
  templateUrl: './create-orders.component.html',
  styleUrls: ['./create-orders.component.scss']
})
export class CreateOrdersComponent implements OnInit {
  createOrderFormGroup: FormGroup;
  products: Product[] = [];
  distributors: Distributor[] = [];
  product: any;
  distributor: any;
  
  constructor(private route: ActivatedRoute, private distributorService: DistributorService,
    private backendService: BackEndServices, private productService: ProductService, private orderService: OrderService) {
      this.createOrderFormGroup = new FormGroup({
        orderId: new FormControl(null, []),
        productName: new FormControl('', []),
        productId: new FormControl('', [Validators.required]),
        totalPrice: new FormControl(0, [Validators.required]),
        orderedOn: new FormControl(null, []),
        quantity: new FormControl('', [Validators.required]),
        distributorName: new FormControl('', []),
        distributorId: new FormControl('', [Validators.required]),
        deliveryAddress: new FormControl('', [Validators.required])
      });
      this.getProducts();
      this.getDistributors();
    }

  getDistributors() {
    this.backendService.getDistributors().subscribe(distributors => {
      this.distributors = distributors;
    })
  }

  getProducts(){
    this.backendService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
  
  ngOnInit(): void {
    // listening for change
    this.productService.productsChange.subscribe(products => {
      this.products = products;
    });
    this.distributorService.distributorsChange.subscribe(distributors => {
      this.distributors = distributors;
    });

    // if there is any change in the productName change the unit price and in stock quantity
    this.createOrderFormGroup.get('productId')?.valueChanges.subscribe(productId => {
      this.backendService.getProductById(productId).subscribe({
        next: product => {
          this.product = product;
          this.createOrderFormGroup.patchValue({
            'productName': this.product.productName,
            'quantity': 1,
            'totalPrice': this.product.perUnitPrice
          })
        },
        error: error => {
          console.log(error);
        }
      })
    });

    this.createOrderFormGroup.get('quantity')?.valueChanges.subscribe(quantity => {
        this.createOrderFormGroup.patchValue({
          'totalPrice': parseInt(this.createOrderFormGroup.get('quantity')?.value) * this.product.perUnitPrice
        })
    });

    this.createOrderFormGroup.get('distributorId')?.valueChanges.subscribe({
      next: distributorId => {
        this.backendService.getDistributorById(distributorId).subscribe(distributor => {
          this.distributor = distributor;
          this.createOrderFormGroup.patchValue({
            'distributorName': distributor.firstName + " " + distributor.lastName
          });
        });
      },
      error: error =>{
        console.log(error);
      }
    });
  }


  onSubmit(){
    console.log(this.createOrderFormGroup.value);
    this.backendService.createOrder(this.createOrderFormGroup.value).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
