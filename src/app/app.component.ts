import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mastergym';
  constructor(public auth: AngularFireAuth) {
  }
  login() {
    //this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.auth.signInWithEmailAndPassword('jdjason569@gmail.com', 'holamundo');
  }
  logout() {
    this.auth.signOut();
  }




}
