import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Product } from '../product.models';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserdetailsComponent implements OnInit {
  userdetails: Product[] = [];

  constructor(private _api: ApiService, private _router: Router) {}

  ngOnInit(): void {
    this.getproduct();
  }

  getproduct() {
    this._api.getProducts().subscribe(res => {
      this.userdetails = res;
    });
  }

  deleteproduct(id: number) {
    this._api.deleteProduct(id).subscribe(() => {
      alert("Deleted successfully");
      this.getproduct();
    });
  }

  editproduct(id: number) {
    this._router.navigate(['updateform', id]);
  }
}
