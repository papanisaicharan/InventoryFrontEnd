import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersComponent } from './suppliers.component';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SuppliersComponent, CreateSupplierComponent],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
  ]
})
export class SuppliersModule { }
