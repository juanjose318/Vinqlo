export interface Post {
  _id: number;
  UserId?: number;
  title: string;
  body: string;
  tags?: string;
  file?: string;
  category?: string;
  createdAt:Date;
  likes: number;
  comments?: [{
    body: string;
    title: string;
  }];
}
