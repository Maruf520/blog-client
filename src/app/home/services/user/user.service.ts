import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  createUser(user: User): Observable<any> {
    const url: string = 'https://localhost:44389/api/Auth/Register';

    return this.httpClient.post(url, user);
  }
}
