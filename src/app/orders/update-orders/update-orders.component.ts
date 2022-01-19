import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Distributor } from 'src/app/models/distributor.model';
import { Order } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { BackEndServices } from 'src/app/services/Backend.service';
import { DistributorService } from 'src/app/services/distributor.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-orders',
  templateUrl: './update-orders.component.html',
  styleUrls: ['./update-orders.component.scss']
})
export class UpdateOrdersComponent implements OnInit {
  updateOrderFormGroup: any;
  order: any;
  product: any;
  distributors: any;


  
  constructor(private router: Router, private distributorService: DistributorService,
    private backendService: BackEndServices, private productService: ProductService, private orderService: OrderService) {
    if (router.getCurrentNavigation()?.extras.state) {
        this.order = router.getCurrentNavigation()?.extras.state;
        this.updateOrderFormGroup = new FormGroup({
          orderId: new FormControl(this.order.orderId, [Validators.required]),
          productName: new FormControl(this.order.productName, [Validators.required]),
          productId: new FormControl(this.order.productId, [Validators.required]),
          totalPrice: new FormControl(this.order.totalPrice, [Validators.required]),
          orderedOn: new FormControl(this.order.orderedOn, [Validators.required]),
          quantity: new FormControl(this.order.quantity, [Validators.required]),
          distributorName: new FormControl(this.order.distributorName, [Validators.required]),
          distributorId: new FormControl(this.order.distributorId, [Validators.required]),
          deliveryAddress: new FormControl(this.order.deliveryAddress, [Validators.required])
        });
    }else{
      this.router.navigateByUrl('/orders');
    }
    
    this.getProduct();
    this.getDistributors();
  }

  getProduct(){
    this.backendService.getProductById(this.order.productId).subscribe(product => {
      this.product = product;
    })
  }

  getOrders(){
    this.backendService.getOrders("").subscribe({
      next: response => {
        this.orderService.setOrders(response.orders);

      },
      error:  error => {
        console.log(error);
      }
    })
  }

  getDistributors(){
    this.backendService.getDistributors().subscribe(distributors => {
      this.distributors = distributors;
    });
  }

  ngOnInit(): void {

    this.updateOrderFormGroup.get('quantity')?.valueChanges.subscribe((quantity: number) => {
      this.updateOrderFormGroup.patchValue({
        'totalPrice': quantity * this.product.perUnitPrice
      })
    });
    this.updateOrderFormGroup.get('distributorId')?.valueChanges.subscribe((distributorId: any) => {
      const distributor = this.distributors.filter((distributor:any) => distributor.distributorId == distributorId);
      this.updateOrderFormGroup.patchValue({
        'distributorName': distributor.firstName + " " + distributor.lastName
      })
    });
  }

  onSubmit(){
    console.log(this.updateOrderFormGroup.value)
    this.backendService.updateOrder(this.updateOrderFormGroup.value).subscribe(
      {
        next: response => {
          console.log(response);
        },
        error: error => {
          console.log(error);
        }
      }
    )
  }

}
