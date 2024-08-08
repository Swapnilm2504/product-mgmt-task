import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.models';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent implements OnInit {

  updateform: FormGroup;
  productId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private _api: ApiService,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    this.updateform = this.fb.group({
      id: [''],
      name: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required,Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
      quantity: new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = +id;
        this.loadProductData();
      } else {
        console.error('Product ID is missing.');
      }
    });
  }

  loadProductData() {
    if (this.productId !== undefined) {
      this._api.getProductsByid(this.productId).subscribe((product: Product) => {
        this.updateform.patchValue({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity
        });
      });
    }
  }

  updateProducts(data: Product) {
    if (this.productId !== undefined) {
      this._api.putProduct(this.productId, data).subscribe(() => {
        this._router.navigate(['']);
        alert("Update Successfully");
      });
    }
  }
}
