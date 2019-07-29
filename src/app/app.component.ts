import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit() {
    let context = this;
    window.addEventListener("beforeunload", function (e) {
        let auth_user : any = JSON.parse(localStorage.getItem('auth_user'));
        if(auth_user){
            context.logoutOnClose();
        }
    });
}

logoutOnClose(){
    let auth_user: any = JSON.parse(localStorage.getItem('auth_user'));
    localStorage.removeItem('auth_user');
}
}
