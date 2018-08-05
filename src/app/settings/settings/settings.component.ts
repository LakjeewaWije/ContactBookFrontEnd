import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  closeResult: string;
  url: string = 'http://192.168.8.102:9000';
  constructor(private http: HttpClient, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
  }
  // logoutUser(content): any {
  //   console.log("clicked");
  //   this.open(content);
  //   if(this.closeResult =='yes'){
  //     console.log('yes');
  //     // this.confirmLogout('yes');
  //   }
  // }
  confirmLogout(status){
    if(status === 'yes'){
      // console.log(status);
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
    }else{
      console.log(status);
    }
    
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.confirmLogout(result);
    }, (reason) => {
      
    });
  }
}
