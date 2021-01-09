import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

declare const gapi: any;
declare var FB: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public auth2: any;
  public scope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'openid',
  ].join(' ');
  public googleCode = {}
  account;
  constructor(private http: HttpClient,private cookieService: CookieService,private _router: Router,
    private _route: ActivatedRoute,private cookie: CookieService) { 
    
  }

  get router(): Router {
    return this._router;
  }

  navigateTo(url) {
    this.router.navigate([url]);
  }

  ngOnInit(): void {
    this.fbLibrary();
  }

  fbLibrary() {

    (window as any).fbAsyncInit = function() {
      FB.init({
        appId: '1254406218097640',
        appSecret: 'f3b3dc73ede4b325cf289e9f73834bf9',
        cookie: true,
        xfbml: true,
        version: 'v6.0'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  login() {

    FB.login((response) => {
      FB.api('/me', {
        fields: 'last_name, first_name, email'
      }, (userInfo) => {
        console.log(userInfo,"data")
        // this._router.navigate(); 
        if(userInfo.hasOwnProperty('email')){
          this.cookie.set("user", "fbUserDataSave");
          localStorage.setItem('fbUserData', JSON.stringify(userInfo));
          alert("Facebook successful login Data Store in localStorage")
         let data = document.getElementById('nextbtn')
         data.click()
        //  console.log(data)
          // this.navigateTo('/list-question')
        }
      });

      this.account = response;
      this.account['status'];

    }, {scope: 'public_profile,email'});
  }


  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: "551226863404-jsb0h2ni363f21897dd0sh77arbort3i.apps.googleusercontent.com",
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      });
    });
  }

  getData() {
    this.attachSignin(document.getElementById('googleBtn'), this.scope);
  }

  public attachSignin(element, scope) {
    this.auth2.grantOfflineAccess(element, scope).then((googleUser => {
        this.googleCode['code'] = googleUser.code;
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        // console.log(this.googleCode)
        this.cookie.set("user", profile.getEmail());
        localStorage.setItem('GoogleUserData', JSON.stringify(profile.getEmail()));
          alert("Google successful login Data Store in localStorage")
        let data = document.getElementById('nextbtn')
        data.click()
      })
    )
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}
