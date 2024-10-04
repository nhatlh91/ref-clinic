import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../../login/services/token-storage.service";
import {
  ExportVoucher,
  ExportVoucherDetail,
  ImportVoucher, ImportVoucherDetail,
  InventoryDto,
  InventoryDtoExport,
  Item
} from "../models/item";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  API_URL = `${environment.apiUrl}/item`;

  constructor(private httpClient: HttpClient,
              private tokenStorageService: TokenStorageService) {
  }

  getItems() {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Item[]>(`${this.API_URL}`, {headers});
  }

  getInventory() {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<InventoryDto[]>(`${this.API_URL}/inventory`, {headers});
  }

  getItemById(id: number | undefined) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Item>(`${this.API_URL}/${id}`, {headers});
  }

  saveItem(patient: Item) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<any>(`${this.API_URL}`, patient, {headers});
  }

  deleteItem(id: number | undefined) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete<any>(`${this.API_URL}/${id}`, {headers});
  }

  import(form: any) {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<any>(`${this.API_URL}/import`, form, {headers});
  }

  getItemForExport() {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<InventoryDtoExport[]>(`${this.API_URL}/inventory-for-export`, {headers});
  }

  export(form: any) {
    debugger;
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<any>(`${this.API_URL}/export`, form, {headers});
  }

  getExportVouchers(year: number){
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<ExportVoucher[]>(`${this.API_URL}/export/${year}`, {headers});
  }

  getExportVoucherDetails(id: number | undefined){
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<ExportVoucherDetail[]>(`${this.API_URL}/export-details/${id}`, {headers});
  }

  getImportVouchers(year: number){
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<ImportVoucher[]>(`${this.API_URL}/import/${year}`, {headers});
  }

  getImportVoucherDetails(id: number | undefined){
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<ImportVoucherDetail[]>(`${this.API_URL}/import-details/${id}`, {headers});
  }

  deleteExportVouchers(id: number | undefined){
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete<any>(`${this.API_URL}/export/${id}`, {headers});
  }

  deleteImportVouchers(id: number | undefined){
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete<any>(`${this.API_URL}/import/${id}`, {headers});
  }
}
