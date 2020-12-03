import { Injectable } from '@angular/core';
import { Post } from '../models/post.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable( { providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}
  posts: Post[] = [];

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`)
    .pipe(
      map(( response: Post[] ) => response )
      );
  }

  addPost(post: Post) {
    this.http.post<{message: string}>(`${environment.apiUrl}/posts`, post )
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.posts.push(post);
    });
  }
}
