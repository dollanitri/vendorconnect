import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from "rxjs/operators"; 


@Injectable({
  providedIn: 'root'
})
export class VendorProductsService {

  data: any;

  constructor(public http: Http) {
    this.data = null;
  }

  getVendorProducts(){

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('http://localhost:8080/api/vendorproducts')
      .pipe(map(res => res.json()));
        /*.subscribe(data => {
          this.data = data;
          resolve(this.data);
        });*/
    });

  }
}
