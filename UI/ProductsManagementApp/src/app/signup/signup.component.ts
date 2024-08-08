import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private _api:ApiService, private _router:Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required,Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
      quantity: new FormControl('',[Validators.required]),
    });
  }

  

  addProducts(data:any){
    this._api.postProduct(data).subscribe(res=>{
      alert("Add product Successfully");
      this._router.navigate(['']);
    })
  }

}
