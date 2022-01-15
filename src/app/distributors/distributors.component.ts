import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Distributor } from '../models/distributor.model';
import { BackEndServices } from '../services/Backend.service';
import { DistributorService } from '../services/distributor.service';

@Component({
  selector: 'app-distributors',
  templateUrl: './distributors.component.html',
  styleUrls: ['./distributors.component.scss']
})
export class DistributorsComponent implements OnInit {

  distributors: Distributor[] = [];

  constructor(private route: ActivatedRoute, private backendService: BackEndServices, private supplierService: DistributorService){

  }

  ngOnInit(): void {
    this.supplierService.distributorsChange.subscribe(distributors => {
      this.distributors = distributors;
    })

    this.backendService.getDistributors().subscribe((distributors: Distributor[]) => {
      this.distributors = distributors;
      this.supplierService.setDistributors(distributors);
    });
  }

}
