import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uemail: string;
  upassword: string;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  /**
   * method to create an event and save that event to event names array
   * @param {string} eventname
   */
  loginUser(): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    this.http.post<any>('http://192.168.8.106:9000/login', {
      email: this.uemail,
      password: this.upassword
    }, {headers: headers}).subscribe(res => {
        console.log(res);
        if (res.data.user.authToken != null) {
          localStorage.setItem('authToken', res.data.user.authToken);
          this.router.navigateByUrl('/contacts');
        }
      },
      err => {
        console.log(err);
        console.log('Error occured');
      }
    );
    this.uemail = '';
    this.upassword = '';
  }
}
