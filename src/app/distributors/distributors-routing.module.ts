import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistributorsComponent } from './distributors.component';


const routes: Routes = [
  {
    path: 'distributors',
    component: DistributorsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class DistributorsRoutingModule {
}
