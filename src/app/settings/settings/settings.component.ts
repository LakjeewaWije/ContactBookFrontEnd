import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  url: string = 'http://192.168.8.102:9000';
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  logoutUser(): any {
    console.log("clicked");
    let authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'authToken':authToken,
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    this.http.put<any>(this.url+'/user/logout',{},
   {headers: headers}).subscribe(res => {
        console.log(res);
        if (res.data != null) {
          localStorage.removeItem('authToken');
          this.router.navigateByUrl('/login');
        }
      },
      err => {
        console.log(err);
        console.log('Error occured');
      }
    );
  }
}
