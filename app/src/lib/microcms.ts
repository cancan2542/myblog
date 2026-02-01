// microCMS API クライアント
import { createClient } from 'microcms-js-sdk';

// microCMSクライアントの作成
export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// 記事の型定義
export interface Article {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  description: string;
  content: string;
  image?: {
    url: string;
    height: number;
    width: number;
  };
  category?: {
    id: string;
    name: string;
  };
  tag?: string;
  created_at?: string;
  updated_at?: string;
}

// 記事一覧のレスポンス型
export interface ArticleListResponse {
  contents: Article[];
  totalCount: number;
  offset: number;
  limit: number;
}

// 記事一覧を取得
export async function getArticles(limit: number = 100): Promise<Article[]> {
  try {
    const response = await client.get<ArticleListResponse>({
      endpoint: 'articles',
      queries: { limit },
    });
    return response.contents;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
}

// 記事を1件取得
export async function getArticle(id: string): Promise<Article | null> {
  try {
    const article = await client.get<Article>({
      endpoint: 'articles',
      contentId: id,
    });
    return article;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return null;
  }
}

// カテゴリ別の記事一覧を取得
export async function getArticlesByCategory(categoryId: string, limit: number = 100): Promise<Article[]> {
  const response = await client.get<ArticleListResponse>({
    endpoint: 'articles',
    queries: {
      limit,
      filters: `category[equals]${categoryId}`,
    },
  });
  return response.contents;
}
