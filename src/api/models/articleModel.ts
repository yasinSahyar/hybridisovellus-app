import db from '../../database/db';
import {Article} from '../../types/LocalTypes';


const getAllArticles = (): Article[] => {
  return db.prepare('SELECT * FROM articles').all() as Article[];
};

const getArticle = (id: number | bigint): Article => {
  const result = db
    .prepare('SELECT * FROM articles WHERE id = ?')
    .get(id) as Article;
  if (!result) {
    throw new Error('Article not found');
  }
  return result;
};
// fetching articles with author details
const getAllArticlesWithAuthorDetails = (): Article[] => {
  return db
    .prepare(`
      SELECT
        articles.id,
        articles.title,
        articles.description,
        articles.author_id,
        authors.name AS author_name
      FROM articles
      LEFT JOIN authors ON articles.author_id = authors.id
    `)
    .all() as Article[];
};

const createArticle = (article: Omit<Article, 'id'>): Article => {
  const stmt = db
    .prepare('INSERT INTO articles (title, description, author_id) VALUES (?, ?, ?)')
    .run(article.title, article.description, article.author_id);
  if (!stmt.lastInsertRowid) {
    throw new Error('Failed to insert article');
  }
  return getArticle(stmt.lastInsertRowid);
};

const updateArticle = (
  id: number | bigint,
  title: string,
  description: string,
): Article => {
  const stmt = db
    .prepare('UPDATE articles SET title = ?, description = ? WHERE id = ?')
    .run(title, description, id);
  if (stmt.changes === 0) {
    throw new Error('Failed to update article');
  }
  return getArticle(id);
};

const deleteArticle = (id: number | bigint): void => {
  const stmt = db.prepare('DELETE FROM articles WHERE id = ?').run(id);

  if (stmt.changes === 0) {
    throw new Error('Article not found');
  }
};


export {getAllArticlesWithAuthorDetails,
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
};
