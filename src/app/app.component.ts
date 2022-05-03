import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'login';

  constructor(private _cookie: CookieService, private _router: Router, public authSvc:AuthService){
    let uuid: string = this._cookie.get('uid');
    if(uuid.length > 2){
      if(this._cookie.get('tipo') == 'admin'){
        this._router.navigateByUrl('/gerente/show');
      }else{
        
        this._router.navigateByUrl('/asilo/regis-asi');
      }
    }else{
      this.authSvc.logout();
    }
  }
}
