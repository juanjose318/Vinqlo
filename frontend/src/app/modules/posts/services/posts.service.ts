import { Injectable } from '@angular/core';
import { Post } from '../models/post.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<{ posts: Post[]; message: string }> {
    return this.http
      .get<{ posts: Post[]; message: string }>(`${environment.apiUrl}/posts`)
      .pipe(map((response) => response));
  }

  getSinglePost(post): Observable<{ post: Post; message: string}> {
    return this.http
      .get<{ message: string; post: Post }>(
        `${environment.apiUrl}/posts/` + post.id)
        .pipe(map( data => {
          return data;
        }));
  }

  addPost(post: Post) {
    this.http
      .post<{ message: string; postId }>(`${environment.apiUrl}/posts`, post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        const postId = responseData.postId;
        post._id = postId;
      });
  }

  deletePost(post: Post) {
    this.http
      .delete<{ message: string }>(`${environment.apiUrl}/posts/` + post._id)
      .subscribe((responseData) => {
        console.log(responseData.message);
      });
  }
}
