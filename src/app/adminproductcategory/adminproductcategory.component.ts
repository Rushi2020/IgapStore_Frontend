import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-adminproductcategory',
  templateUrl: './adminproductcategory.component.html',
  styleUrls: ['./adminproductcategory.component.css']
})
export class AdminproductcategoryComponent implements OnInit {
  id=0;
  formdata:any;
  name="";

  constructor (private cookie : CookieService, private router:Router, private api :ApiService, 
     private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    if(this.id != 0)
    {
      //Read data from api - Edit mode
      var reqdata = {"data" : {id: this.id}};
      var reply = this.api.callapi("admin/productcategory", reqdata);
      reply.subscribe((mydata: any)=>{
        let data = Array.from(Object.keys(mydata), k=>mydata[k]);
        this.name = data[0].name;
        this.binddata();
      });
    }
    else{
      this.binddata();
    }
    window.scrollTo(0, 0);
  }

  binddata()
  {
    this.formdata = new FormGroup({
      id: new FormControl(this.id, Validators.compose([Validators.required])),
      name: new FormControl(this.name, Validators.compose([Validators.required])),
    });
  }

      
  onClickSubmit(data:any){
    var reqdata = {"data" : data};
    var reply = this.api.callapi("admin/saveproductcategory", reqdata);
    reply.subscribe((mydata: any)=>{
      data = Array.from(Object.keys(mydata), k=>mydata[k]);
      var status = data[0].status;
      if(status == "success"){
        this.router.navigate(["./admin-product-categories"]).then(()=>{
          window.location.reload();
        });
      }
      else{
        alert("Something went wrong.");
      }
    });
  }
}

