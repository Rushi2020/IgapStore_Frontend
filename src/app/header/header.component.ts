import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isadmin = false;
  productcategories: any;
  selectedcategory = "Categories";
  selectedcategoryid = 0;

  constructor(private api: ApiService) {
    if(this.api.getcookie("usertype") == "admin")
      this.isadmin = true;
   }

  ngOnInit(): void {
    var reply = this.api.callapi("admin/productcategories", {"data" : {}});
    reply.subscribe((mydata: any)=>{
      this.productcategories = mydata;
    });
  }

  changecategory(id: number, name: string)
  {
    this.selectedcategory = name;
    this.selectedcategoryid = id;
  }
}