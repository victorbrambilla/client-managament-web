import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateEmail, Email, UpdateEmail } from '../../../core/models/email.model';
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:8080/emails'; 

  constructor(private http: HttpClient) { }

  getEmailsByCliente(id:number): Observable<Email[]> {

    return this.http.get<Email[]>( `${this.apiUrl}/cliente/${id}`);
  }

  getEmail(id: number): Observable<Email> {
    return this.http.get<Email>(`${this.apiUrl}/${id}`);
  }

  createEmail(Email: CreateEmail): Observable<Email> {
    return this.http.post<Email>(this.apiUrl, Email);
  }

  updateEmail(id: number, Email: UpdateEmail): Observable<Email> {
    return this.http.put<Email>(`${this.apiUrl}/${id}`, Email);
  }

  deleteEmail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
