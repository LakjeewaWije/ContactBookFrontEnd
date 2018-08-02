import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    firstname: string;
    lastname: string;
    uemail: string;
    upassword: string;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  /**
   * method to create an event and save that event to event names array
   * @param {string} eventname
   */
  registerUser(): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    this.http.post<any>('http://192.168.8.106:9000/user/add', {
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.uemail,
      password: this.upassword
    }, {headers: headers}).subscribe(res => {
        console.log(res);
        if (res.data != null) {
          this.firstname = '';
          this.lastname = '';
          this.uemail = '';
          this.upassword = '';
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
