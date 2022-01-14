import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { BackEndServices } from '../services/Backend.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private route: ActivatedRoute, private backendService: BackEndServices, private productService: ProductService){
  }

  ngOnInit(): void {
    this.productService.productsChange.subscribe(products => {
      this.products = products;
    })

    this.backendService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.productService.setProducts(products);
      console.log(this.products);
    });
  }


}
