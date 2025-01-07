import { Injectable } from '@angular/core';
import { Post } from '../../types/post.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { ApiResponse } from '../../types/apiReponse.type';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  savePost(post: Post): Observable<any> {
    console.log('token', this.userService.token);
    const url: string = 'https://localhost:44389/api/Post';
    return this.httpClient.post(url, post, {
      headers: { authorization: `Bearer ${this.userService.token}` },
    });
  }
  getAllPosts(): Observable<ApiResponse<Post[]>> {
    const url: string = 'https://localhost:44389/api/Post/getallposts';
    return this.httpClient.get<ApiResponse<Post[]>>(url, {
      headers: { authorization: `Bearer ${this.userService.token}` },
    });
  }

  deletePost(postId: number): Observable<ApiResponse<any>> {
    const url = `https://localhost:44389/api/Post?id=${postId}`;
    return this.httpClient.delete<ApiResponse<any>>(url, {
      headers: { authorization: `Bearer ${this.userService.token}` },
    });
  }
}
