import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) { }

  GetUsers(){
    return this.http.get("http://localhost:3000/getUsers");
  }

  AddUser(obj:any){
    return this.http.post("http://localhost:3000/addUser",obj,{
      headers:{
        "Content-Type": "application/json",
      }
      
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
);
  }
  UpdateUser(obj:any){
    return this.http.post("http://localhost:3000/updateUser",obj,{
      headers:{
        'Content-Type': 'application/json'
      }
      
      // 'Content-Type': 'application/x-www-form-urlencoded',
    });
  }

  DeleteUser(obj:any){
    return this.http.post("http://localhost:3000/deleteUser",obj,{
      headers:{
        "Content-Type": "application/json",
      }
      
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },);
  }

  GetSpecificUser(email: string){
    return this.http.get("http://localhost:3000/getUser?email="+email);
  }
}
