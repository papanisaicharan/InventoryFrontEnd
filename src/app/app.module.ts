import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { SuppliersModule } from './suppliers/suppliers.module';
import { BackEndServices } from './services/Backend.service';
import { HttpClientModule } from '@angular/common/http';
import { DistributorsModule } from './distributors/distributors.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    NgbModule,
    SuppliersModule,
    DistributorsModule,
    ProductsModule,
    OrdersModule,
    HttpClientModule,
  ],
  providers: [BackEndServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
