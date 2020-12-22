import { Injectable } from '@angular/core';
import { Post } from '../models/post.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<{ posts: Post[]; message: string }> {
    return this.http
      .get<{ posts: Post[]; message: string }>(`${environment.apiUrl}/posts`)
      .pipe(map((response) => response));
  }

  getSinglePost(post): Observable<{ post: Post; message: string }> {
    return this.http
      .get<{ message: string; post: Post }>(
        `${environment.apiUrl}/posts/` + post.id
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  addPost(post: Post) {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('body', post.body);
    postData.append('tags', post.tags);
    if (!!post.file) {
      postData.append('file', post.file, post.title);
    }
    postData.append('category', post.category);
    var dataestr = new Date(post.createdAt).toUTCString();
    postData.append('createdAt', dataestr);

    this.http
      .post<{ message: string; postId }>(
        `${environment.apiUrl}/posts`,
        postData
      )
      .subscribe((responseData) => {
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

  updatePost(post: Post) {
    let postData: Post | FormData;
    if(typeof (post.file) ==='object') {
      postData = new FormData();
      var dataestr = new Date(post.createdAt).toUTCString();
      var idStrg = post._id.toString();
      postData.append('id', idStrg);
      postData.append('title', post.title);
      postData.append('body', post.body);
      postData.append('tags', post.tags);
      postData.append('file', post.file, post.title);
      postData.append('category', post.category);
      postData.append('createdAt', dataestr);
    }
    else {
        postData = {
        _id: post._id,
        title: post.title,
        body: post.body,
        tags: post.tags,
        category: post.category,
        file: post.file,
        createdAt: post.createdAt
      }
    }
    this.http
      .put<{ message: string }>(`${environment.apiUrl}/posts/` + post._id, postData)
      .subscribe((responseData) => {
        console.log(responseData.message);
      });
  }
}
