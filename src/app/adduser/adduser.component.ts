import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseService } from '../base.service';
import Swal from 'sweetalert2'
import { response } from 'express';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AdduserComponent {

  data:any= [];

  bosses: string[] = [];
  employees: string[] = [];

  bosesOption: any[] = [];

  temporalboss:string = "";
  temporalemployee:string = "";
  constructor(private backService: BaseService){}
  ngOnInit(){
    this.backService.GetUsers().subscribe(response=>{
      let elem :any=  response;
      console.log(elem['employees']);
      this.data = response;
      for(let y = 0; y< elem['employees'].length;y++){
        if(elem['employees'][y]['position'] == 'boss'){
          this.bosesOption.push(elem['employees'][y]);
        }
      }

    });
  }

  user: any = {
    name: "",
    email:"", 
    position:"",
    relation:{boss:[],employee:[]}
  };

  SendInfo(){
    this.user.relation.boss = this.bosses;
    this.user.relation.employee = this.employees;
    this.backService.AddUser(this.user).subscribe(response =>{
      let resp:any =  response;
      if(resp['error'] != undefined){
        this.Alert('error','the user has not been created');
      }
      else{
        this.Alert('User Created','the user has been created');
      }
      
    });
    
    console.log("clicked",this.user,'warning');
  }

  Alert(title:string,message:string){
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Cool'
    })
  }

  AddBoss(){
    if(this.temporalboss != "" && !this.bosses.includes(this.temporalboss)){
      this.bosses.push(this.temporalboss);
      this.temporalboss = "";
    }
    
  }

  RemoveBoss(){
    this.bosses.splice(this.bosses.indexOf(this.temporalboss),1);
  }

  AddEmployee(){
    if(this.temporalemployee != "" && !this.employees.includes(this.temporalemployee)){
      this.employees.push(this.temporalemployee);
      this.temporalemployee = "";
    }
    
  }

  RemoveEmployee(){
    this.employees.splice(this.employees.indexOf(this.temporalemployee),1);
  }

}
