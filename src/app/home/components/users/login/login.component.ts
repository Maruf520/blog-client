import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { TokenResponse } from '../../../types/user.type';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  userLoginForm!: FormGroup;
  alertType: number = 0;
  alertMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  get email(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('email');
  }
  get password(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('password');
  }

  onSubmit(): void {
    this.userService.login(this.email?.value, this.password?.value).subscribe({
      next: (result: TokenResponse) => {
        this.alertType = 0;
        this.alertMessage = 'Login successful';
        this.userService.activateToken(result);
        // setTimeout(() => {
        //   this.location.back();
        // }, 1000);
      },
      error: (error) => {
        this.alertType = 2;
        this.alertMessage = error.error.error.message;
      },
    });
  }
}
