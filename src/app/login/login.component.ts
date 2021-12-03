import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   formLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })


  constructor(private fb: FormBuilder, public auth4: AngularFireAuth) { }

  ngOnInit(): void {}

  login() {
    this.auth4.signInWithEmailAndPassword(this.formLogin.get('email')?.value, this.formLogin.get('password')?.value )
    .then(user =>{
      console.log('usuario resuktado', user);
        })
  }

}
