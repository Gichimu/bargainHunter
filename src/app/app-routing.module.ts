import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompareComponent } from './compare/compare.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'compare', component: CompareComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
