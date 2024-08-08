import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateFormComponent } from './update-form/update-form.component';

const routes: Routes = [
  { path: '', component: UserdetailsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'updateform/:id', component: UpdateFormComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
