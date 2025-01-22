import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommentService } from '../../services/comment/comment.service';
import { CommonModule } from '@angular/common';
import { CreateComment } from '../../types/comment.type';
import { map, Observable, Subscription } from 'rxjs';
import { Author, Comment } from '../../types/user.type';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnDestroy, OnInit {
  commentForm!: FormGroup;
  alertMessage: string = '';
  alertType: number = 0;
  submitted = false;
  commentAuthor: Author = {
    firstName: '',
    lastName: '',
    mobile: '',
    address: '',
    image: null,
    email: '',
  };
  userNames: { [userId: string]: string } = {};
  subscriptions: Subscription = new Subscription();
  @Input() comments: Comment[] = [];
  @Input() postId!: string;

  constructor(
    private commentService: CommentService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required]],
    });
  }

  get content(): AbstractControl<any, any> | null {
    return this.commentForm.get('content');
  }

  ngOnInit() {
    this.comments.forEach((comment) => {
      this.fetchUserName(comment.createdBy);
    });
  }
  fetchUserName(userId: string): void {
    if (!this.userNames[userId]) {
      this.userService.getUser(userId).subscribe((response) => {
        this.userNames[
          userId
        ] = `${response.data.firstName} ${response.data.lastName}`;
      });
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.content?.value.trim()) {
      const comment: CreateComment = {
        postId: this.postId,
        content: this.content?.value,
        commentId: '',
      };
      this.subscriptions.add(
        this.commentService.saveComment(comment).subscribe({
          next: (result) => {
            this.alertType = 0;
            this.alertMessage = 'Posted Successfully!';
            this.reset();
            this.loadPostComments(this.postId);
            this.fetchUserName(result.data);
          },
          error: (error) => {
            this.alertMessage = error.error.message;
          },
        })
      );
    } else {
      this.alertMessage = 'Please write a comment before submitting.';
    }
  }

  loadPostComments(postId: string): void {
    this.subscriptions.add(
      this.commentService.loadComments(postId).subscribe({
        next: (response) => {
          this.comments = response.data;
        },
        error: (error) => {
          this.alertMessage = error.error.message;
        },
      })
    );
  }
  reset(): void {
    this.commentForm = this.fb.group({
      content: [''],
    });
  }

  getUserName(userId: string): string {
    return this.userNames[userId] || 'Loading...';
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
