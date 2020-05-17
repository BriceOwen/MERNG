export interface Comment {
  id: string;
  body: string;
  author: Author;
  createdAt: string;
}

export interface Author {
  id: string;
  username: string;
}

export interface Like {
  id: string;
  author: Author;
  createdAt: string;
}

export interface Post {
  id: string;
  body: string;
  author: Author;
  likeCount: number;
  commentCount: number;
  likes: Like[] | null;
  comments: Comment[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface Posts {
  getPosts: Post[] | null;
}
