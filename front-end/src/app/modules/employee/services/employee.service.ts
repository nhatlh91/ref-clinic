import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../../login/services/token-storage.service";
import {UserDto} from "../components/models/user-dto";
import {RegisterRequest, ResetPasswordRequest} from "../components/employee-list/employee-list.component";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  API_URL = `${environment.apiUrl}/user`;

  constructor(private httpClient: HttpClient,
              private tokenStorageService: TokenStorageService) {
  }

  getUsers() {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<UserDto[]>(`${this.API_URL}`, {headers});
  }

  saveUser(request: RegisterRequest) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<any>(`${this.API_URL}`, request, {headers});
  }

  deleteUserById(id: number | undefined) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete<any>(`${this.API_URL}/${id}`, {headers});
  }

  resetPassword(request: ResetPasswordRequest) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.put<any>(`${this.API_URL}/reset-password`, request, {headers});
  }
}
