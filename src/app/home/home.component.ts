import { Component } from '@angular/core';
import { BaseService } from '../base.service';

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

  
}
