import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BackEndServices } from 'src/app/services/Backend.service';
import { DistributorService } from 'src/app/services/distributor.service';

@Component({
  selector: 'app-create-distributor',
  templateUrl: './create-distributor.component.html',
  styleUrls: ['./create-distributor.component.scss']
})
export class CreateDistributorComponent implements OnInit {

  createDistributorFormGroup: FormGroup;
  
  constructor(private route: ActivatedRoute, private backendService: BackEndServices, private supplierService: DistributorService) { 
    this.createDistributorFormGroup = new FormGroup({
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
    this.backendService.createDistributor(this.createDistributorFormGroup.value).subscribe({
      next: response => {
        this.getDistributors();
      },
      error: error => {
        console.log("error occured while creating distributors..!");
      }
    })
  }

  getDistributors(){
    this.backendService.getDistributors().subscribe(distributors => {
      this.supplierService.setDistributors(distributors);
    });
  }

}
