import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {AuthenticationResponse} from "../components/login/login.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _API_URL = environment.apiUrl + '/auth';

  constructor(private httpClient: HttpClient,
              private tokenStorageService: TokenStorageService) {
  }

  login(obj: any) {
    return this.httpClient.post<AuthenticationResponse>(this._API_URL + '/authenticate', {
      phone: obj.phone,
      password: obj.password
    });
  }

  signOut(): Observable<any> {
    window.localStorage.clear();
    window.sessionStorage.clear();
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post(this._API_URL + '/logout', {headers});
  }

}
