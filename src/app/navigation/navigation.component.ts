import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  auth_user;

  errorMessage: string;
  successMessage: string;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.refreshUser();
  }

  logout(){
    this.authService.logout().subscribe(
      success=> {
        this.refreshUser();
        this.router.navigate(["landing"])
      } 
    );
  }

  login(user: NgForm){
    this.authService.login(user.value).subscribe(
      success=> {
        this.refreshUser();
        this.router.navigate(["home"])
      },
      error => {
        this.errorMessage = "Invalid login"
      }
    );
  }

  refreshUser(){
    this.auth_user = JSON.parse(localStorage.getItem("auth_user"));
  }

}
