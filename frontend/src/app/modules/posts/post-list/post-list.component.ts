import { Component } from '@angular/core';

export interface Post {
  title:string;
  body:string;
  tags?:string;
  comments?:[]
}

@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls:['./post-list.component.scss']
})

export class PostListComponent {
  constructor() { }

  ngOnInit() { }
}
