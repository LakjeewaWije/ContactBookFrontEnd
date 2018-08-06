import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {Contact} from '../Data-model';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
   // -------------------------------Variables Used When Adding Contacts-----------------------------------
  contactName: any;
  contactNumber: any;
  officenumber: any;
  useremail:any;
  useraddress: any;
  // -------------------------------Varibales Used When Editing a Contact-----------------------------------
  newcontactId: any;
  newcontactName: any;
  newcontactNumber: any;
  newofficenumber: any;
  newuseremail:any;
  newuseraddress: any;
  newuser:any;
   // ------------------------------------------------------------------
  contacts: any;
  contact = new Contact();
  editmodal: any;
  usernamehead:any;
  private _success = new Subject<string>();
  status: string;
  modalstatus: string;
  closeResult: string;
  url: string = 'http://192.168.8.101:9000';
  constructor(private http: HttpClient, private router: Router, private modalService: NgbModal) {
    console.log('authToken ' + localStorage.getItem('authToken'));
    this.editmodal = document.getElementById('myModal');
  }

  ngOnInit() {
    this.usernamehead = localStorage.getItem('firstName');
    console.log(this.usernamehead);
    this.getContacts();
    this._success.subscribe((message) => this.status = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.status = null);
  }
  /**
   * method to create an event and save that event to event names array
   * @param {string} eventname
   */
  addContact(): any {
    if(this.contactName !=null && this.contactNumber != null){
    if(!isNaN(this.contactNumber)){
      const headers = new HttpHeaders({
        'authToken': localStorage.getItem('authToken'),
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      });
      this.http.post<any>(this.url + '/contact/add', {
        contactName: this.contactName,
        contactNumber: this.contactNumber,
        postalAddress: this.useraddress,
        workNumber: this.officenumber,
        email: this.useremail
      }, {headers: headers}).subscribe(res => {
          console.log(res);
          if (res.data != null) {
            this.contacts = res.data;
            this.contactName =null;
            this.contactNumber=null;
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
        this.changeSuccessMessage('Contact Number must be numeric');
    }
  }else{
    this.changeSuccessMessage('Fill required Fields');
  }
  }
  getContacts() {
    const headers = new HttpHeaders({
      'authToken': localStorage.getItem('authToken'),
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    this.http.get<any>(this.url + '/contact/view', {headers: headers}).subscribe(res => {
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
    this.http.delete<any>(this.url + '/contact/delete' + '/' + contact.contactId, {headers: headers}).subscribe(res => {
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
  editContact(content,contact: any): any {
    this.newcontactName = contact.contactName;
      this.newcontactNumber = contact.contactNumber;
      this.newofficenumber = contact.workNumber;
      this.newuseraddress= contact.postalAddress;
      this.newuseremail= contact.email;
      this.newcontactId = contact.contactId;
      this.newuser= contact.user;
      console.log(this.newuser);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log('result'+result)
      this.saveEditedContact(result);
    }, (reason) => {
      console.log('reason'+reason);
    });
    console.log('edit');
  }

  saveEditedContact(result): any {
    if(result === 'save'){
    let contactToUpdate: any;
    let user: any;
    console.log('Contact new is   ---- '+this.newcontactNumber+this.newcontactName+this.newofficenumber+this.newuseraddress+this.newuseremail+this.newuser);
    if(this.newcontactName !=null && this.newcontactNumber != null){
    if(!isNaN(this.newcontactNumber)){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    this.http.put<any>(this.url + '/contact/update', {
      contactId: this.newcontactId,
      contactName: this.newcontactName,
      contactNumber: this.newcontactNumber,
      postalAddress: this.newuseraddress,
        workNumber: this.newofficenumber,
        email: this.newuseremail,
       user: this.newuser
    }, {headers: headers}).subscribe(res => {
        console.log(res);
        if (res.data != null) {
          this.contacts = res.data;
          if (this.contacts != null) {
            
          }
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
    this.changeSuccessMessage('Contact Number must be numeric');
}
}else{
  this.changeSuccessMessage('Fill required Fields');
}
    }else{
      console.log(status);
    }
  }
  public changeSuccessMessage(message :string) {
    if(message != null){
      this._success.next(message);
    }else{
      this._success.next('Fill required Fields');
    }
  }
}

