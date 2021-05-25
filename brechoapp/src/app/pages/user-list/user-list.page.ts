import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  users:User[] = [];

  constructor(
    private userService:UserServiceService,
    private router:Router
  ) { }

  ngOnInit() {
    this.userService.getAll().subscribe(
      res=>{
        this.users = res;
        console.log(this.users);
      },
      erro =>{

      }
    )   
  }

  editar(usuario){
    this.router.navigate(['/tabs/userAdd',usuario.key])
  }


}
