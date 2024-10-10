import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/users`;;

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  // Obtener usuario por ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // Crear usuario
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  // Actualizar usuario
  updateUser(id: number, user: User): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, user);
  }

  // Eliminar usuario
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}