import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { CreateComment } from '../../types/comment.type';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  saveComment(comment: CreateComment): Observable<any> {
    const url: string = 'https://localhost:44389/api/Comment';
    return this.httpClient.post(url, comment, {
      headers: { authorization: `Bearer ${this.userService.token}` },
    });
  }
  loadComments(postId: string): Observable<any> {
    const url: string = `https://localhost:44389/api/Comment/${postId}`;
    return this.httpClient.get(url, {
      headers: { authorization: `Bearer ${this.userService.token}` },
    });
  }
}
