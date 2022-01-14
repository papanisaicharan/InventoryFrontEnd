import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BackEndServices } from 'src/app/services/Backend.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss']
})
export class CreateSupplierComponent implements OnInit {

  createSupplierFormGroup: FormGroup;
  
  constructor(private route: ActivatedRoute, private backendService: BackEndServices, private supplierService: SupplierService) { 
    this.createSupplierFormGroup = new FormGroup({
      emailId: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.backendService.createSupplier(this.createSupplierFormGroup.value).subscribe({
      next: response => {
        this.getSuppliers();
      },
      error: error => {
        console.log("error occured while creating suppliers..!");
      }
    })
  }

  getSuppliers(){
    this.backendService.getSuppliers().subscribe(suppliers => {
      this.supplierService.setSuppliers(suppliers);
    });
  }

}
