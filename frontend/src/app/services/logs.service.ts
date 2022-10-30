import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  endpoint: string = environment.endpoint;
  constructor(private http: HttpClient, public router: Router) { }

  getLogs(page: number){
    return this.http.get(`${this.endpoint}/logs` + '?page=' + page);
  }

  saveLog(formData: any): Observable<any> {
    let api = `${this.endpoint}/logs`;
    const headers = new HttpHeaders();
    return this.http.post(api, formData, {
      headers: headers
    });
  }
}
