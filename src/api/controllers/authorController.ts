import {NextFunction, Request, Response} from 'express';
import {Author} from '../../types/LocalTypes';
import CustomError from '../../classes/CustomError';
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor} from '../models/authorModel';

// Get all authors
const authorsGet = (
  req: Request,
  res: Response<Author[]>,
  next: NextFunction,
) => {
  try {
    const authors = getAllAuthors();
    res.json(authors);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// Get a single author by ID
const authorGet = (
  req: Request<{ id: string }>,
  res: Response<Author>,
  next: NextFunction,
) => {
  try {
    const author = getAuthorById(Number(req.params.id));
    if (!author) {
      throw new CustomError('Author not found', 404);
    }
    res.json(author);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// Create a new author
const authorPost = (
  req: Request<unknown, unknown, Omit<Author, 'id'>>,
  res: Response<Author>,
  next: NextFunction,
) => {
  try {
    const newAuthor = createAuthor(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// Update an existing author
const authorPut = (
  req: Request<{ id: string }, unknown, Omit<Author, 'id'>>,
  res: Response<Author>,
  next: NextFunction,
) => {
  try {
    const updatedAuthor = updateAuthor(Number(req.params.id), req.body);
    res.json(updatedAuthor);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// Delete an author
const authorDelete = (
  req: Request<{ id: string }>,
  res: Response<void>,
  next: NextFunction,
) => {
  try {
    deleteAuthor(Number(req.params.id));
    res.status(204).end();
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};



export {authorsGet,
  authorGet,
  authorPost,
  authorPut,
  authorDelete,};
