export interface Post {
  id: number;
  UserId?: number;
  title: string;
  body: string;
  tags?: string;
  comments?: [{
    body: string;
    title: string;
  }];
}
