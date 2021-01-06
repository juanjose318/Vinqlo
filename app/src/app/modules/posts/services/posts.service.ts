import { Injectable } from '@angular/core';
import { Post } from '../models/post.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  private creatorId;
  private posts: Post[] = [];
  private postListener = new Subject<{ posts: Post[] }>();
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http
      .get<{ posts: any; message: string }>(`${environment.apiUrl}/posts`)
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post) => {
              return {
                title: post.title,
                body: post.body,
                id: post._id,
                file: post.file,
                category: post.category,
                tags: post.tags,
                createdAt: post.createdAt,
                likes: post.likes,
                likers: post.likers,
                comments: post.comments,
                creator: post.creator,
              };
            }),
          };
        })
      )
      .subscribe((transformedPostData) => {
        console.log(transformedPostData);
        this.posts = transformedPostData.posts;
        this.postListener.next({
          posts: [...this.posts],
        });
      });
  }

  getCreatorId() {
    return this.creatorId;
  }

  getPostListener() {
    return this.postListener.asObservable();
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

  addPostToCollection(postId) {
    this.http.post(
      `${environment.apiUrl}/posts/` + postId + '/addPostToUserCollection', postId)
      .subscribe((response) => {
        console.log(response);
      })
  }

  addCommentPost(comment) {
    this.http
      .post<{ message: string; comment: any }>(
        `${environment.apiUrl}/comments/` + comment.post,
        comment
      )
      .subscribe((responseData) => {
        const creatorId = responseData.comment.creator;
        this.creatorId = creatorId;
      });
  }

  addPost(post: Post) {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('body', post.body);
    postData.append('tags', post.tags);
    postData.append('creator', post.creator);
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
        post.id = postId;
      });
  }

  likeToggle(post) {
    console.log(post);
    return this.http
      .post<{ message: string; status: string; likesCount: number }>(
        `${environment.apiUrl}/posts/` + post.id + '/toggleLikePost',
        true
      )
      .subscribe((postData) => {
        const likes = postData;
      });
  }

  deletePost(postId) {
    return this.http.delete(`${environment.apiUrl}/posts/` + postId);
  }

  deleteComment(comment) {
    return this.http.delete(
      `${environment.apiUrl}/comments/` + comment.post + '/' + comment._id
    );
  }

  updatePost(post: Post) {
    let postData: Post | FormData;
    if (typeof post.file === 'object') {
      postData = new FormData();
      let dataestr = new Date(post.createdAt).toUTCString();
      let idStrg = post.id.toString();
      postData.append('id', idStrg);
      postData.append('title', post.title);
      postData.append('body', post.body);
      postData.append('tags', post.tags);
      postData.append('file', post.file, post.title);
      postData.append('category', post.category);
      postData.append('createdAt', dataestr);
    } else {
      postData = {
        id: post.id,
        title: post.title,
        body: post.body,
        tags: post.tags,
        category: post.category,
        file: post.file,
        createdAt: post.createdAt,
        likes: post.likes,
        creator: post.creator,
      };
    }
    this.http
      .put<{ message: string }>(
        `${environment.apiUrl}/posts/` + post.id,
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData.message);
      });
  }
}
