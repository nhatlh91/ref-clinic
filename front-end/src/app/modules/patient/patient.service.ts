import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Patient} from "./models/patient";
import {TokenStorageService} from "../login/services/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  API_URL = `${environment.apiUrl}/patient`;

  constructor(private httpClient: HttpClient,
              private tokenStorageService: TokenStorageService) {
  }

  getPatients() {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Patient[]>(`${this.API_URL}`, {headers});
  }

  getPatientById(id: number | undefined) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Patient>(`${this.API_URL}/${id}`, {headers});
  }

  debtSubtract(id: number | undefined, amount: number | undefined) {
    if (id == null && amount == null) return;
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let params = new HttpParams();
    params = params.append('id', String(id));
    params = params.append('amount', String(amount));
    return this.httpClient.get<any>(`${this.API_URL}/debt-subtract/`, {params, headers});
  }

  savePatient(patient: Patient) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<any>(`${this.API_URL}`, patient, {headers});
  }

  deletePatient(id: number | undefined) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete<any>(`${this.API_URL}/${id}`, {headers});
  }
}
