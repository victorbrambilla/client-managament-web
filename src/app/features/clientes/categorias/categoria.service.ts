import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../../../core/models/categoria.model';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:8080/categorias'; 

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Categoria[]> {

    return this.http.get<Categoria[]>(this.apiUrl );
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }

  createCategoria(Categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, Categoria);
  }

  updateCategoria(id: number, Categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, Categoria);
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
