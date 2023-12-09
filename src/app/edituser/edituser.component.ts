import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { BaseService } from '../base.service';
import { response } from 'express';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EdituserComponent {
  userUrl: any={};


  bosses: string[] = [];
  employees: string[] = [];

  temporalboss:string = "";
  temporalemployee:string = "";

  bosesOption: any[] = [];

  data:any= [];

  user: any = {
    name: "",
    email:"", 
    position:"",
    relation:{boss:[],employee:[]}
  };

  constructor(private route: ActivatedRoute,private backService: BaseService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userUrl = localStorage.getItem("Email")
      console.log("LOCAL STORAGE", localStorage.getItem("Email"));
      console.log("clicked",this.userUrl,params.get('user'));
      this.backService.GetSpecificUser(this.userUrl).subscribe(response=>{
        let ret :any = response;
        console.log(response);

        this.user.email = ret['employees'][0]['email'];
        this.user.name = ret['employees'][0]['name'];
        this.user.position = ret['employees'][0]['position'];

        for(let i = 0; i < ret['relations'].length;i++){
          if(ret['relations'][i]['boss'] != this.userUrl){
            this.bosses.push(ret['relations'][i]['boss']);
          }
          if(ret['relations'][i]['employeeref'] != this.userUrl){
            this.employees.push(ret['relations'][i]['employeeref']);
          }
        }
      })

    })

    this.backService.GetUsers().subscribe(response=>{
      let elem :any=  response;
      this.data = response;
      for(let y = 0; y< elem['employees'].length;y++){
        if(elem['employees'][y]['position'] == 'boss'){
          this.bosesOption.push(elem['employees'][y]);
        }
      }

    });
  }


  SendInfo(){
    this.user.relation.boss = this.bosses;
    if(this.user.position != "employee"){
      this.user.relation.employee = this.employees;
    }else{
      this.user.relation.employee = [];
    }   
    
    this.backService.UpdateUser(this.user).subscribe(response =>{
      let resp:any =  response;
      if(resp['error'] != undefined){
        this.Alert('error','the user has not been updated');
        console.log("CLICked",response)
      }
      else{
        this.Alert('User Updated','the user has been updated');
      }
      
    });
    
    console.log("clicked",this.user,'warning');
  }

  Alert(title:string,message:string){
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'OK'
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
