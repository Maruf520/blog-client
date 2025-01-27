import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordReset } from '../../types/resetPassword.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://localhost:44389/api/Account';

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-password-reset`, { email });
  }

  resetPassword(resetPassword: PasswordReset): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, {
      email: resetPassword.email,
      token: resetPassword.token,
      newPassword: resetPassword.newPassword,
    });
  }
}
