import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Users } from '../models/users.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isRegisterClicked = false;
  emailValidationError: string = "";
  passwordValidationError: string = "";
  objUsers: Users;
  constructor(private _formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.objUsers = new Users();
   }

  loginForm = this._formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  registerForm = this._formBuilder.group({
    fName: ['', Validators.required],
    lName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    emailValidationError: [''],
    passwordValidationError: ['']
  });
  submit(){}
  registerUser(){
    this.isRegisterClicked = true;
  }

  btnCancelRegister(){
    
  }

  btnCreateUser(){
    if(!this.registerForm.valid){
      alert("Please fill all the fields!");
      return;
    }
    this.setUsersData();
    this.userService.createUser(this.objUsers.fName, this.objUsers.lName, this.objUsers.email, this.objUsers.password).subscribe(result => {
      //if(result){
        console.log('User created successfully!');
        this.router.navigate(['/dashboard'], {queryParams: {fName: this.objUsers.fName, lName: this.objUsers.lName}});
     // }
    },
    error => {
      if(error.error){
        if(error.error.errors){
          if(error.error.errors.email){
            //alert(error.error.errors.email.message);
            this.emailValidationError = error.error.errors.email.message;
          }
          if(error.error.errors.password){
            //alert(error.error.errors.passwor.message);
            this.passwordValidationError = error.error.errors.password.message;
          }
        }
        else{
          alert(error.error);
        }
      }
      
    });
  }

  btnLogin(){
    if(!this.loginForm.valid){
      alert("Please fill all the fields!");
      return;
    }
    this.userService.loginUser(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).subscribe(result => {
      if(result){
        this.router.navigate(['/dashboard'], {queryParams: {fName: result.user.fName, lName:result.user.lName}});
      }
    },
    error => {
      alert(JSON.stringify(error.error));
      this.loginForm.controls['email'].setValue("");
      this.loginForm.controls['password'].setValue("");
    });
  }

  setUsersData(){
    this.objUsers.fName = this.registerForm.controls['fName'].value;
    this.objUsers.lName = this.registerForm.controls['lName'].value;
    this.objUsers.email = this.registerForm.controls['email'].value;
    this.objUsers.password = this.registerForm.controls['password'].value;
  }
    
  
  ngOnInit(): void {
  }

}
