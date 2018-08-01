import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
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
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  /**
   * method to create an event and save that event to event names array
   * @param {string} eventname
   */
  registerUser() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    this.http.post('http://192.168.8.105:9000/user', {
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.uemail,
      password: this.upassword
    }, {headers: headers}).subscribe(res => {
        console.log(res);
      },
      err => {
        console.log(err);
        console.log('Error occured');
      }
    );
    this.firstname = '';
    this.lastname = '';
    this.uemail = '';
    this.upassword = '';
  }
}
