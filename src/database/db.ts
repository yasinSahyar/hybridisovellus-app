import Database from 'better-sqlite3';
import {
  checkAuthorsData,
  exampleAuthorsData,
  checkData,
  exampleData,
  filename,
  tables,
  updatedTables} from './db-config';

const db = new Database(filename);
// Enable foreign key enforcement in SQLite
db.pragma('journal_mode = WAL');

// Enable foreign key constraints
db.pragma('foreign_keys = ON');

// init tables, use exec only for CREATE TABLE
db.exec(tables);
// Updates the articles table with author_id and foreign key
db.exec(updatedTables);

// Check if the authors table is empty
const authorRowCount = (db.prepare(checkAuthorsData).get() as {count: number}).count;
if (authorRowCount === 0) {
    db.exec(exampleAuthorsData);
    console.log('Inserted example authors data.');
} else {
    console.log('Authors table already populated.');
}

// Check if the articles table is empty
const rowCount = (db.prepare(checkData).get() as {count: number}).count;
//If the table is empty, insert example data
if (rowCount === 0) {
  db.prepare(exampleData);
  console.log('Inserted example data.');
} else {
  console.log('Table already populated.');
}

export default db;
