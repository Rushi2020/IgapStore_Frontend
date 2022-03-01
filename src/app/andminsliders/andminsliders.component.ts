import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-andminsliders',
  templateUrl: './andminsliders.component.html',
  styleUrls: ['./andminsliders.component.css']
})
export class AndminslidersComponent implements OnInit {
  
   baseurl = this.api.baseurl;
  data:any;
  
  constructor( private router:Router, private api :ApiService ) { }
  

  ngOnInit(): void {
    this.binddata();
  }
  binddata(){
    var reqdata= {"data":{}};
    var reply = this.api.callapi("admin/sliders", reqdata);
    reply.subscribe((mydata:any)=>
    {
      this.data= mydata;
    });
  }

  Deletedata(id:number){
    let result = confirm("Sure To Delete");
    if(result){
    
      var reqdata= {"data":{id : id}};
      var reply = this.api.callapi("admin/deleteslider", reqdata);
      reply.subscribe((mydata:any)=>{
        this.binddata()

      });
    }
      
  }

} 


