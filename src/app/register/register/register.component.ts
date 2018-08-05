import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
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
    url: string = 'http://192.168.8.102:9000';
    private _success = new Subject<string>();
    status: string;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this._success.subscribe((message) => this.status = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.status = null);
  }
  /**
   * method to create an event and save that event to event names array
   * @param {string} eventname
   */
  registerUser(): any {
    if(this.firstname != null && this.lastname !=null && this.uemail != null && this.upassword != null){
      console.log(this.firstname+this.lastname+this.uemail+this.upassword);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      });
      this.http.post<any>(this.url+'/user/add', {
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
          if(err.error.message != null){
              this.changeSuccessMessage(err.error.message);
          }
          console.log('Error occured');
        }
      );
    }else{
      console.log('fill all the fields');
      this.changeSuccessMessage(null);
      this.firstname=null;
      this.lastname=null;
      this.uemail=null;
      this.upassword=null;
    }
  }
  public changeSuccessMessage(message :string) {
    if(message != null){
      this._success.next(message);
    }else{
      this._success.next('Please Fill all the Fields');
    }
    
  }
}
