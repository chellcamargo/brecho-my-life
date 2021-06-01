import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';



@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.page.html',
  styleUrls: ['./user-perfil.page.scss'],
})
export class UserPerfilPage implements OnInit {

  key:string = null;
  user:User = new User;

  constructor(
    private activatedRouter: ActivatedRoute,
    private userService:UserServiceService
  ) { }

  ngOnInit() {
    this.key = this.activatedRouter.snapshot.paramMap.get('key');
    this.getUser(this.key);
  }

  async getUser(key) {
    if (key) {
      await this.userService.get(key).subscribe(
        res => {
          this.user = res;
          return true;
        },
        error => {
          console.log("ERRO:", error);
          return false;
        }
      )
    }
  }
}
