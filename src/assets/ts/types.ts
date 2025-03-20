export type Welcome = {
  status: string;
  totalResults: number;
  articles: Article[];
};

export type Article = {
  source: string;
  author: null | string;
  title: string;
  description: string;
  url: string;
  urlToImage: null | string;
  publishedAt: Date;
  content: string;
};
