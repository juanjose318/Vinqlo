export interface Post {
  _id: number;
  UserId?: number;
  title: string;
  body: string;
  tags?: string;
  createdAt:Date;
  comments?: [{
    body: string;
    title: string;
  }];
}
