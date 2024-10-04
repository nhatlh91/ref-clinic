import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../../login/services/token-storage.service";
import {environment} from "../../../../environments/environment";
import {Patient} from "../../patient/models/patient";
import {Registration, RegistrationDetail} from "../models/registration";
import {Service} from "../models/service";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  API_URL = `${environment.apiUrl}/registration`;

  constructor(private httpClient: HttpClient,
              private tokenStorageService: TokenStorageService) {
  }

  getServices() {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Service[]>(`${this.API_URL}/services`, {headers});
  }

  saveService(item: Service) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<any>(`${this.API_URL}/services`, item, {headers});
  }

  getRegistration() {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Registration[]>(`${this.API_URL}`, {headers});
  }

  getRegistrationDetails(id: number | undefined) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<RegistrationDetail[]>(`${this.API_URL}/details/${id}`, {headers});
  }

  saveRegistration(registration: Registration) {
    // const token = this.tokenStorageService.getToken();
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<any>(`${this.API_URL}`, registration);
  }

  closeRegistration(id: number | undefined) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(`${this.API_URL}/close-registration/${id}`, {headers});
  }

  deleteRegistration(id: number) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete<any>(`${this.API_URL}/${id}`, {headers});
  }
}
