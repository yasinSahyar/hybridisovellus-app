import db from '../../database/db';
import {Author} from '../../types/LocalTypes';

const getAllAuthors = (): Author[] => {
  return db.prepare('SELECT * FROM authors').all() as Author[];
};

// Get a single author by ID
const getAuthorById = (id: number): Author | null => {
  const author = db.prepare('SELECT * FROM authors WHERE id = ?').get(id) as Author;
  return author || null; // Return null if not found
};

// Create a new author
const createAuthor = (author: Omit<Author, 'id'>): Author => {
  const stmt = db.prepare('INSERT INTO authors (name, email) VALUES (?, ?)').run(author.name, author.email);
  if (!stmt.lastInsertRowid) {
    throw new Error('Failed to insert author');
  }
  return getAuthorById(Number(stmt.lastInsertRowid))!;
};

// Update an author
const updateAuthor = (id: number, author: Omit<Author, 'id'>): Author => {
  const stmt = db.prepare('UPDATE authors SET name = ?, email = ? WHERE id = ?').run(author.name, author.email, id);
  if (stmt.changes === 0) {
    throw new Error('Failed to update author');
  }
  return getAuthorById(id)!;
};

// Delete an author
const deleteAuthor = (id: number): void => {
  const stmt = db.prepare('DELETE FROM authors WHERE id = ?').run(id);
  if (stmt.changes === 0) {
    throw new Error('Author not found');
  }
};

export {getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor};
