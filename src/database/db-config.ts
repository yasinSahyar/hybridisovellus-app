const filename = 'example.sqlite';

const tables = `
    CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE RESTRICT
);

    CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);
`;

const checkData = `SELECT COUNT(*) AS count FROM articles`;

const exampleData = `INSERT INTO articles (title, description, author_id) VALUES
('Article 1', 'This is the first article', 1),
('Article 2', 'This is the second article', 2),
('Article 3', 'This is the third article', 1)
`;


const checkAuthorsData = `SELECT COUNT(*) AS count FROM authors`;
const exampleAuthorsData = `
    INSERT INTO authors (name, email) VALUES
    ('Author One', 'author1@example.com'),
    ('Author Two', 'author2@example.com')
`;
const updatedTables = `
-- Temporary table with the new structure
CREATE TABLE IF NOT EXISTS articles_temp (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE RESTRICT
);

-- Copy data from old articles table to the temporary table
INSERT INTO articles_temp (id, title, description)
SELECT id, title, description FROM articles;

-- Drop the original articles table
DROP TABLE articles;

-- Rename the temporary table to articles
ALTER TABLE articles_temp RENAME TO articles;
`;


export {updatedTables, filename, tables, checkData, exampleData,  checkAuthorsData, exampleAuthorsData};
