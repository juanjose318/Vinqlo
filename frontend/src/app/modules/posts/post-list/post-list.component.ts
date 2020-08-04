import { Component } from '@angular/core';

export interface Post {
  title:string;
  body: string;
  tags?:string;
  comments?: [{
    body: string;
    title: string;
  }]
}

@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls:['./post-list.component.scss']
})

export class PostListComponent {

  posts: Post[] = [
    { title : "User Name" , body: "This is a post", tags: "tags, hi, sports, running"},
    { title : "User Name" , body: "This is a post", tags: "tags, hi, sports, running"},
    { title : "User Name" , body: "This is a post", tags: "tags, hi, sports, running"},
    { title : "User Name" , body: "This is a post", tags: "tags, hi, sports, running"},
    { title : "User Name" , body: "This is a post", tags: "tags, hi, sports, running"}
  ]
  /**
   *  posts= [];
  */
}
