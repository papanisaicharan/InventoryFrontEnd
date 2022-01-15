import { Component, OnInit } from '@angular/core';
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
  distributors: Distributor[] = [];
  products: Product[] = [];
  productPrice: number = 0;
  productQuantity: number = 0;
  
  constructor(private route: ActivatedRoute, private distributorService: DistributorService,
    private backendService: BackEndServices, private productService: ProductService, private orderService: OrderService) {
      this.createOrderFormGroup = new FormGroup({
        productName: new FormControl('', [Validators.required]),
        productId: new FormControl('', [Validators.required]),
        totalPrice: new FormControl('', [Validators.required]),
        quantity: new FormControl('', [Validators.required]),
        distributorName: new FormControl('', [Validators.required]),
        distributorId: new FormControl('', [Validators.required]),
        deliveryAddress: new FormControl('', [Validators.required])
      });
     }

  ngOnInit(): void {

    this.backendService.getProducts().subscribe(products => {
      this.products = products;
    });
    this.backendService.getDistributors().subscribe(distributors => {
      this.distributors = distributors;
    })
    this.productService.productsChange.subscribe(products => {
      this.products = products;
    });
    this.distributorService.distributorsChange.subscribe(distributors => {
      this.distributors = distributors;
    });

    this.createOrderFormGroup.get('productName')?.valueChanges.subscribe(productName => {
      const product = this.products.filter(product => product.productName == productName)[0];
      this.createOrderFormGroup.patchValue({
        'productId': product.productId
      });
      this.productPrice = product.perUnitPrice;
      this.productQuantity = product.quantity;
      if(this.createOrderFormGroup.get('quantity')?.value != ''){
        this.createOrderFormGroup?.patchValue({
          'totalPrice': parseInt(this.createOrderFormGroup.get('quantity')?.value) * this.productPrice
        })
      }else{
        this.createOrderFormGroup?.patchValue({
          'totalPrice': this.productPrice,
          'quantity': 1
        });
      }
      console.log(this.createOrderFormGroup.value);
    });

    this.createOrderFormGroup.get('quantity')?.valueChanges.subscribe(quantity => {
      this.createOrderFormGroup.patchValue({
        'totalPrice': parseInt(this.createOrderFormGroup.get('quantity')?.value) * this.productPrice
      })
    });

    this.createOrderFormGroup.get('distributorName')?.valueChanges.subscribe(name => {
      const distributor = this.distributors.filter(distributor => distributor.firstName +" " +distributor.lastName == name)[0];
      this.createOrderFormGroup.patchValue({
        'distributorId': distributor.emailId
      })
    });
  }

  onSubmit(){
    this.backendService.createOrder(this.createOrderFormGroup.value).subscribe({
      next: response => {
        this.getOrders();
      },
      error: error => {
        console.log(error);
      }
      
    });
  }

  getOrders(){
    this.backendService.getOrders().subscribe(orders => {
      this.orderService.setOrders(orders);
    })
  }

}
