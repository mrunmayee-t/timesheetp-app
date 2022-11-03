import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/users';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public createUser(fName:any, lName:any, email: any, password: any){
    return this.http.post<any>(API_URL,{fName, lName, email, password});
  }

  public loginUser(email: any, password: any){
    return this.http.post<any>(API_URL+'/login', {email, password});
  }
}
