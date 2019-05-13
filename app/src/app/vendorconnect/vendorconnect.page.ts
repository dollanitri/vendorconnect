import { Component, OnInit } from '@angular/core';
import { VendorProductsService } from '../vendor-products.service';

@Component({
  selector: 'app-vendorconnect',
  templateUrl: './vendorconnect.page.html',
  styleUrls: ['./vendorconnect.page.scss'],
})
export class VendorconnectPage {

  vendorproducts: any;

  constructor( public vendorProductsService: VendorProductsService) {

  }

  ionViewDidLoad(){

    this.vendorProductsService.getVendorProducts().then((data) => {
      console.log(data);
      this.vendorproducts = data;
    });

  }

}
