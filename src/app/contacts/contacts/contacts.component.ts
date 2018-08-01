import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contactName: string;
  contactNumber: string;
  contacts: any;
  constructor(private http: HttpClient, private router: Router) {
    console.log('authToken ' + localStorage.getItem('authToken'));
  }

  ngOnInit() {
    this.getContacts();
  }
  /**
   * method to create an event and save that event to event names array
   * @param {string} eventname
   */
  addContact(): any {
    const headers = new HttpHeaders({
      'authToken': localStorage.getItem('authToken'),
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    this.http.post<any>('http://192.168.8.106:9000/addcontact', {
      contactName: this.contactName,
      contactNumber: this.contactNumber
    }, {headers: headers}).subscribe(res => {
        console.log(res);
        if (res.data != null) {
          this.contacts = res.data;
        }
      },
      err => {
        console.log(err);
        console.log('Error occured');
      }
    );
  }
  getContacts() {
    const headers = new HttpHeaders({
      'authToken': localStorage.getItem('authToken'),
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    this.http.get<any>('http://192.168.8.106:9000/viewContacts', {headers: headers}).subscribe(res => {
        console.log(res);
        if (res.data != null) {
          this.contacts = res.data;
        }
      },
      err => {
        console.log(err);
        console.log('Error occured');
      }
    );
  }
}

