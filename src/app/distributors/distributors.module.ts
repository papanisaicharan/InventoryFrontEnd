import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistributorsComponent } from '../distributors/distributors.component';
import { CreateDistributorComponent } from './create-distributor/create-distributor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DistributorsRoutingModule } from './distributors-routing.module';



@NgModule({
  declarations: [
    DistributorsComponent,
    CreateDistributorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DistributorsRoutingModule
  ]
})
export class DistributorsModule { }
