import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../types/user.type';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  userSignUpForm!: FormGroup;
  alertMessage: string = '';
  alertType: number = 0;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.userSignUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get firstName(): AbstractControl<any, any> | null {
    return this.userSignUpForm.get('firstName');
  }
  get lastName(): AbstractControl<any, any> | null {
    return this.userSignUpForm.get('lastName');
  }
  get email(): AbstractControl<any, any> | null {
    return this.userSignUpForm.get('email');
  }
  get address(): AbstractControl<any, any> | null {
    return this.userSignUpForm.get('address');
  }
  get password(): AbstractControl<any, any> | null {
    return this.userSignUpForm.get('password');
  }
  get confirmPassword(): AbstractControl<any, any> | null {
    return this.userSignUpForm.get('confirmPassword');
  }

  onSubmit() {
    const user: User = {
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      address: this.lastName?.value,
      mobile: this.userSignUpForm.get('mobile')?.value,
      email: this.email?.value,
      password: this.password?.value,
    };
    //if (this.userSignUpForm.valid) {
    this.userService.createUser(user).subscribe({
      next: (result) => {
        console.log(result.data);
        this.alertMessage = result.data;
        this.alertType = 0;
      },
      error: (errors) => {
        this.alertMessage = errors.error.error.message;
        this.alertType = 2;
      },
    });
    //}
    // else {
    //   this.alertMessage = 'Please fill all required fields.';
    //   this.alertType = 2;
    // }
  }
}
