export type BlogType = {
    id: string;
    title: string;
    content: string;
    userId: string;
    author: string; // or author: { name: string } if nested
  };