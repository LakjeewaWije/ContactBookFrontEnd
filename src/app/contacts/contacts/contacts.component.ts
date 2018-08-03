import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {Contact} from '../Data-model';
import {User} from '../Data-model';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contactName: any;
  contactNumber: any;
  newcontactName: any;
  newcontactNumber: any;
  contacts: any;
  contact = new Contact();
  user = new User();
  editmodal: any;
  constructor(private http: HttpClient, private router: Router) {
    console.log('authToken ' + localStorage.getItem('authToken'));
    this.editmodal = document.getElementById('myModal');
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
    this.http.post<any>('http://192.168.8.104:9000/contact/add', {
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
    this.http.get<any>('http://192.168.8.104:9000/contact/view', {headers: headers}).subscribe(res => {
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
  deleteContact(contact: any) {
    console.log(contact);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    this.http.delete<any>('http://192.168.8.104:9000/contact/delete' + '/' + contact.contactId, {
      contact
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
  editContact(contact: any): any {
    console.log('edit');
    this.editmodal = document.getElementById('myModal');
    this.editmodal.style.display = 'block';
    this.newcontactName = contact.contactName;
    this.newcontactNumber = contact.contactNumber;
    this.contact.setcontactId(contact.contactId);
    this.user.setuserId(contact.user.userId);
    this.user.setfirstName(contact.user.firstName);
    this.user.setlastName(contact.user.lastName);
    this.user.setemail(contact.user.email);
    this.user.setpassword(contact.user.password);
    this.user.setAuthToken(contact.user.authToken);
    this.contact.setuserObj(this.user);
  }

  saveEditedContact(): any {
    const contactToUpdate: any;
    const user: any;
    this.contact.setcontactName(this.newcontactName);
    this.contact.setcontactNumber(this.newcontactNumber);
    contactToUpdate = this.contact;
    user = this.user;
    console.log(this.contact);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    this.http.put<any>('http://192.168.8.104:9000/contact/update', {
      contactId: contactToUpdate.contactId,
      contactName: contactToUpdate.contactName,
      contactNumber: contactToUpdate.contactNumber,
       user: user
    }, {headers: headers}).subscribe(res => {
        console.log(res);
        if (res.data != null) {
          this.contacts = res.data;
          if (this.contacts != null) {
            this.editmodal.style.display = 'none';
          }
        }
      },
      err => {
        console.log(err);
        console.log('Error occured');
      }
    );
  }
  closeModal() {
    this.editmodal.style.display = 'none';
  }
}

