export interface Post {
  _id: number;
  UserId?: number;
  title: string;
  body: string;
  tags?: string;
  comments?: [{
    body: string;
    title: string;
  }];
}
