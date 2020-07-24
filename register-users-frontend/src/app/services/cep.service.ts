import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://viacep.com.br/ws/';
const return_type = '/json/';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  validateCep(cep: string): Observable<any> {
    console.log('CEP: ', cep);
    return this.http.get(baseUrl + cep + return_type);
  }
}
