import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Supplier } from './models/supplier.model';
import { BackEndServices } from './services/Backend.service';
import { SupplierService } from './services/supplier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'InventoryFrontend';

  constructor(private route: ActivatedRoute){

  }

  ngOnInit(): void {
  }
  
}
