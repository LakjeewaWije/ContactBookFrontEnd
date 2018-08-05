import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { element } from '@angular/core/src/render3/instructions';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uemail: string;
  upassword: string;
  url: string = 'http://192.168.8.102:9000';
  // ------------------------------------------------------------
  private _success = new Subject<string>();
  status: string;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {

    if(localStorage.getItem('authToken')!= null){
      this.router.navigateByUrl('/contacts');
    }
    this._success.subscribe((message) => this.status = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.status = null);
  }
  /**
   * method to create an event and save that event to event names array
   * @param {string} eventname
   */
  loginUser(): any {
    if(this.uemail !=null && this.upassword !=null){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    this.http.post<any>(this.url+'/user/login', {
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
  }else{
    console.log('Fill all the fields');
    this.changeSuccessMessage();
    this.uemail=null;
    this.upassword=null;
  }
}
public changeSuccessMessage() {
  this._success.next('Please Fill all the Fields');
}
}
