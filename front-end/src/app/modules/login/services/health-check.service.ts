import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {

  constructor(private httpClient: HttpClient) {
  }

  healthCheck(): Observable<any> {
    return this.httpClient.get(`${environment.host}/actuator/health`);
  }
}
