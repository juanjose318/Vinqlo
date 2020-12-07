import { Injectable } from '@angular/core';
import { Post } from '../models/post.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable( { providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}
  private posts: Post[] = [];

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`)
    .pipe(
      map((response) => response)
      );
  }

  addPost(post: Post) {
    this.http.post<{message: string}>(`${environment.apiUrl}/posts`, post )
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.posts.push(post);
    });
  }

  deletePost(post: Post) {
    this.http.delete(`${environment.apiUrl}/posts/` + post._id)
    .subscribe(() => {
     const updatedPosts = this.posts.filter(res => res._id !== post._id);
     this.posts = updatedPosts;
        });
  }
}
