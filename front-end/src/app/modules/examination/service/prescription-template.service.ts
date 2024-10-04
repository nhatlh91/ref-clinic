import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../../login/services/token-storage.service";
import {Prescription, PrescriptionTemplate} from "../models/record-result";

@Injectable({
  providedIn: 'root'
})
export class PrescriptionTemplateService {
  API_URL = `${environment.apiUrl}/item`;

  constructor(private httpClient: HttpClient,
              private tokenStorageService: TokenStorageService) {
  }

  saveTemplate(template: PrescriptionTemplate) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<any>(`${this.API_URL}/prescription-template`, template, {headers});
  }

  getAllTemplate() {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<PrescriptionTemplate[]>(`${this.API_URL}/prescription-template`, {headers});
  }

  getTemplateDetailById(id: number | undefined) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Prescription[]>(`${this.API_URL}/prescription-template-detail/${id}`, {headers});
  }

  deleteTemplateById(id: number | undefined) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete<any>(`${this.API_URL}/prescription-template/${id}`, {headers});
  }

}
