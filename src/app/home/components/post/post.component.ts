import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../services/post/post.service';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../../types/post.type';
import { ApiResponse } from '../../types/apiReponse.type';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommentComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnDestroy, OnInit {
  postForm!: FormGroup;
  alertMessage: string = '';
  alertType: number = 0;
  submitted = false;
  allPost: ApiResponse<Post[]> = {
    isSuccess: false,
    isFailure: true,
    error: null,
    data: [],
  };

  subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private postService: PostService) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.loadPosts();
  }

  get title(): AbstractControl<any, any> | null {
    return this.postForm.get('title');
  }

  get body(): AbstractControl<any, any> | null {
    return this.postForm.get('body');
  }

  onSubmit(): void {
    const post: Post = {
      title: this.title?.value,
      body: this.body?.value,
      id: 0,
    };
    this.submitted = true;
    if (this.postForm.valid) {
      this.subscriptions.add(
        this.postService.savePost(post).subscribe({
          next: (result) => {
            this.alertType = 0;
            this.alertMessage = 'Posted Successfully!';
            this.reset();
            this.loadPosts();
          },
          error: (error) => {
            this.alertMessage = error.error.message;
          },
        })
      );
    }
  }

  loadPosts(): void {
    this.subscriptions.add(
      this.postService.getAllPosts().subscribe({
        next: (response) => {
          this.allPost = response;
        },
        error: (error) => {
          this.alertMessage = error.error.message;
        },
      })
    );
  }
  deletePost(id: number): void {
    this.subscriptions.add(
      this.postService.deletePost(id).subscribe({
        next: (response) => {
          this.alertMessage = response.data;
          this.loadPosts();
        },
        error: (error) => {
          this.alertMessage = error.error.message;
        },
      })
    );
  }

  reset(): void {
    this.postForm = this.fb.group({
      title: [''],
      body: [''],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
