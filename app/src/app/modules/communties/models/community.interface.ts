import { User } from "../../auth/models/user.interface";
import { Post } from "../../posts/models/post.interface";

export interface Community {
  _id: number;
  title: string;
  creator: string;
  description: string;
  users?: User[];
  isReported: boolean;
  posts: Post[];
}
