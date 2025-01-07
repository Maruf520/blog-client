import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { loggedInUser, TokenResponse, User } from '../../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authToken!: string;
  private autoLogoutTimer: any;
  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  private loggedInUserInfo: BehaviorSubject<loggedInUser> = new BehaviorSubject(
    <loggedInUser>{}
  );
  constructor(private httpClient: HttpClient) {
    this.loadToken();
  }

  get isUserAuthenticated(): boolean {
    return this.isAuthenticated.value;
  }
  get loggedInUserInfos(): loggedInUser {
    return this.loggedInUserInfo.value;
  }

  get isUserAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get token(): string {
    return this.authToken;
  }

  createUser(user: User): Observable<any> {
    const url: string = 'https://localhost:44389/api/Auth/Register';

    return this.httpClient.post(url, user);
  }

  login(email: string, passowrd: string): Observable<any> {
    const url: string = 'https://localhost:44389/api/Auth/login';

    return this.httpClient.post(url, { email: email, password: passowrd });
  }

  activateToken(token: TokenResponse): void {
    localStorage.setItem('token', token.token);
    const expiryDate = new Date(
      Date.now() + Number(token.expiresInSeconds) * 1000
    );
    const user = {
      firstName: token.user.firstName,
      lastName: token.user.lastName,
      address: token.user.address,
      email: token.user.email,
      mobile: token.user.mobile,
    };
    localStorage.setItem('expiry', expiryDate.toISOString());
    localStorage.setItem('user', JSON.stringify(user));

    this.isAuthenticated.next(true);
    this.loggedInUserInfo.next(token.user);
    this.setAutoLogoutTimer(token.expiresInSeconds * 1000);
    this.authToken = token.token;
  }

  private setAutoLogoutTimer(duration: number): void {
    this.autoLogoutTimer = setTimeout(() => {
      this.logOut();
    }, duration);
  }

  logOut(): void {
    localStorage.clear();
    this.isAuthenticated.next(false);
    this.loggedInUserInfo.next(<loggedInUser>{});
    clearTimeout(this.autoLogoutTimer);
  }

  loadToken(): void {
    const token: string | null = localStorage.getItem('token');
    const expiry: string | null = localStorage.getItem('expiry');
    if (!token || !expiry) {
      return;
    } else {
      const expiresIn: number =
        new Date(expiry).getTime() - new Date().getTime();
      if (expiresIn > 0) {
        // const firstName: string | null = localStorage.getItem('firstName');
        // const lastName: string | null = localStorage.getItem('lastName');
        // const address: string | null = localStorage.getItem('address');
        // const mobile: string | null = localStorage.getItem('mobile');
        // const email: string | null = localStorage.getItem('email');
        // const image: string | null = localStorage.getItem('image');
        const storedUser = localStorage.getItem('user');
        const loggedUuser: User = JSON.parse(storedUser as string);
        const user: loggedInUser = {
          firstName: loggedUuser.firstName != null ? loggedUuser.firstName : '',
          lastName: loggedUuser.lastName != null ? loggedUuser.lastName : '',
          address: loggedUuser.address != null ? loggedUuser.address : '',
          mobile: loggedUuser.mobile != null ? loggedUuser.mobile : '',
          email: loggedUuser.email != null ? loggedUuser.email : '',
        };
        this.isAuthenticated.next(true);
        this.loggedInUserInfo.next(user);
        this.setAutoLogoutTimer(expiresIn);
        this.authToken = token;
      } else {
        this.logOut();
      }
    }
  }

  // getUser(): Observable<User> {
  //   const storedUser = localStorage.getItem('user');

  //   if (storedUser) {
  //     const user = JSON.parse(storedUser);

  //     console.log('User first name:', user.firstName);
  //     console.log('User last name:', user.lastName);
  //     console.log('User address:', user.address);
  //     console.log('User email:', user.email);
  //     console.log('User mobile:', user.mobile);
  //   } else {
  //     console.log('No user found in localStorage');
  //   }
  // }
}
