import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { response } from 'express';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  data: any  = [];

  constructor(private backService: BaseService){
    
  }

  ngOnInit(){
    this.backService.GetUsers().subscribe(response=>{
      console.log(response);
      this.data = response;
    });
  }

  DeleteUser(user:any){
    this.backService.DeleteUser(user).subscribe(response=>{
      let resp:any =  response;
      if(resp['error'] != undefined){
        this.Alert('Error','the user has not been Deleted');
      }
      else{
        this.Alert('User Deleted','the user has been Deleted');
        this.backService.GetUsers().subscribe(response=>{
          console.log(response);
          this.data = response;
        });
      }

    })
  }
Alert(title:string,message:string){
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'OK'
    })
  }

  AddToLocal(userEmail:string){
    localStorage.setItem("Email", userEmail);
  }
  
}
