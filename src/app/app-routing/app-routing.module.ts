import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {RegisterComponent} from '../register/register/register.component';
import {LoginComponent} from '../login/login/login.component';
import {ContactsComponent} from '../contacts/contacts/contacts.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login' , component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  {path: 'contacts', component: ContactsComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
