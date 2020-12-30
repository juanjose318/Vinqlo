export interface Post {
  id: number;
  UserId?: number;
  title: string;
  body: string;
  tags?: string;
  file?: string;
  category?: string;
  createdAt:Date;
  likes: number;
  creator: string;
  comments?: [{
    body: string;
    title: string;
  }];
}
