import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../../login/services/token-storage.service";
import {Service} from "../models/service";
import {Registration, RegistrationDetail} from "../models/registration";
import {Prescription, RecordResult, RecordResultDetail} from "../models/record-result";

@Injectable({
  providedIn: 'root'
})
export class RecordResultService {
  API_URL = `${environment.apiUrl}/record-result`;

  constructor(private httpClient: HttpClient,
              private tokenStorageService: TokenStorageService) {
  }

  getRecords() {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<RecordResult[]>(`${this.API_URL}`, {headers});
  }

  getHistory(id: number | undefined) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<RecordResult[]>(`${this.API_URL}/patient-id/${id}`, {headers});
  }

  getDetails(id: number | undefined) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<RecordResultDetail[]>(`${this.API_URL}/details/${id}`, {headers});
  }

  getPrescription(id: number | undefined) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Prescription[]>(`${this.API_URL}/prescription/record-result-id/${id}`, {headers});
  }

  getPrescriptionByTemplateId(id: number | undefined) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Prescription[]>(`${this.API_URL}/prescription/template-id/${id}`, {headers});
  }

  updateRecordResult(recordResult: any) {
    debugger
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.put<any>(`${this.API_URL}`, recordResult, {headers});
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
