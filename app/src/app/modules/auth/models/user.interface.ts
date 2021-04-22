import { Community } from "../../communties/models/community.interface";
import { Post } from "../../posts/models/post.interface";

export interface User {
  _id?: number;
  name: string;
  lastName: string;
  password: string;
  email: string;
  bio: string;
  status: boolean;
  communities: Community[];
  socialMedia: socialMedia;
  postsCollection : Post[];
  isAdmin:boolean;
  degree: string;
  campus:string;
}

interface socialMedia {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  phoneNumber?: string;
}
