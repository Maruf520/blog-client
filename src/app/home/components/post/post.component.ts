import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { PostService } from '../../services/post/post.service';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../../types/post.type';
import { ApiResponse } from '../../types/apiReponse.type';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GetPost } from '../../types/user.type';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommentComponent,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnDestroy, OnInit {
  postForm!: FormGroup;
  alertMessage: string = '';
  alertType: number = 0;
  submitted = false;
  allPost: ApiResponse<GetPost[]> = {
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

  readonly dialog = inject(MatDialog);

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.backdropClick().subscribe(() => {
      console.log('Backdrop clicked');
      dialogRef.close();
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
      id: '',
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
  deletePost(id: string): void {
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      width: '300px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
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
      } else {
        console.log('Deletion canceled');
      }
    });
  }

  reset(): void {
    this.postForm = this.fb.group({
      title: [''],
      body: [''],
    });
  }
  onEdit(id: string) {
    console.log('Edit action triggered');
  }

  onUpdate(id: string) {
    console.log('Update action triggered');
  }

  onDelete(id: string) {
    console.log('Delete action triggered');
    this.deletePost(id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
