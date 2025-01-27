import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PasswordReset } from '../../../types/resetPassword.type';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  alertType: number = 0;
  alertMessage: string = '';
  token: string | null = '';
  email: string | null = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatch }
    );
    this.token = decodeURIComponent(
      this.route.snapshot.params['token'] ||
        this.route.snapshot.queryParams['token']
    ).replace(/\s/g, '');
    this.email = this.route.snapshot.queryParamMap.get('email');
  }

  get confirmPassword(): AbstractControl<any, any> | null {
    return this.resetPasswordForm.get('confirmPassword');
  }

  get newPassword(): AbstractControl<any, any> | null {
    return this.resetPasswordForm.get('newPassword');
  }

  passwordsMatch(fb: FormGroup): { [key: string]: boolean } | null {
    const newPassword = fb.get('newPassword')?.value;
    const confirmPassword = fb.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      if (this.email && this.token) {
        const passowrdDto: PasswordReset = {
          email: this.email,
          token: this.token,
          newPassword: this.newPassword?.value,
        };
        this.authService.resetPassword(passowrdDto).subscribe({
          next: (response) => {
            this.alertMessage = response;
            this.alertType = 0;
            this.router.navigate(['/login'], {
              state: { message: 'Password reset successfull. Please log in.' },
            });
          },
          error: (error) => {
            this.alertMessage = error.error;
            this.alertType = 2;
          },
        });
      }
    }
  }
}
