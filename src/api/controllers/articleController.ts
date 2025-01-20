import { NextFunction, Request, Response } from 'express';
import { Article } from '../../types/LocalTypes';
import CustomError from '../../classes/CustomError';
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticle,
  updateArticle,
  getAllArticlesWithAuthorDetails,
} from '../models/articleModel';

// Fetch all articles with author details
const articlesGet = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const articles = getAllArticlesWithAuthorDetails();
    res.json(articles);  // Send the response without returning
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// Create a new article
const articlePost = (req: Request, res: Response, next: NextFunction): void => {
  const { title, description, author_id }: { title: string; description: string; author_id: number } = req.body;

  if (!title || !description || !author_id) {
    return next(new CustomError('Title, description, and author_id are required', 400));
  }

  try {
    // Pass the article data as an object, assuming createArticle expects it this way
    const newArticle = createArticle({ title, description, author_id });
    res.status(201).json(newArticle);  // Send the created article in the response
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// Fetch a single article
const articleGet = (
  req: Request<{ id: string }>,
  res: Response<Article>,
  next: NextFunction
): void => {
  try {
    const article = getArticle(Number(req.params.id));
    if (!article) {
      throw new CustomError('Article not found', 404);
    }
    res.json(article);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// Update an existing article
const articlePut = (
  req: Request<{ id: string }, unknown, Omit<Article, 'id'>>,
  res: Response<Article>,
  next: NextFunction
): void => {
  const { title, description }: { title: string; description: string } = req.body;

  if (!title || !description) {
    return next(new CustomError('Title and description are required to update the article', 400));
  }

  try {
    const updatedArticle = updateArticle(
      Number(req.params.id),
      title,
      description
    );
    if (!updatedArticle) {
      throw new CustomError('Article not found', 404);
    }
    res.json(updatedArticle);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// Delete an article
const articleDelete = (
  req: Request<{ id: string }>,
  res: Response<void>,
  next: NextFunction
): void => {
  try {
    deleteArticle(Number(req.params.id));  // Assuming deleteArticle does not return anything
    res.status(204).end();  // Successful delete, no content in response
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export {
  articlesGet,
  articleGet,
  articlePost,
  articlePut,
  articleDelete,
};
