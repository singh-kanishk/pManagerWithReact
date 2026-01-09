import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';


// 1. Get the absolute path to the folder
const dbFolder = path.resolve(import.meta.dirname, 'db');

// 2. Ensure the folder actually exists (SQLite won't create the folder for you)
if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder, { recursive: true });
}

// 3. Point to the actual FILE, not just the folder
const dbPath = path.join(dbFolder, 'foobar.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
    
    CREATE TABLE IF NOT EXISTS folder (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        folderName TEXT NOT NULL UNIQUE
    )
    `)

db.exec(`
    CREATE TABLE IF NOT EXISTS data (
        itemId INTEGER PRIMARY KEY AUTOINCREMENT,
        itemName TEXT NOT NULL,
        folderId INTEGER,
        url TEXT,
        userName TEXT NOT NULL,
        password TEXT NOT NULL,
        note TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (folderId) REFERENCES folder(id) ON DELETE CASCADE
        )    
    `)
    //DELETE CASCADE Use->
    //If you delete a folder, SQLite will automatically delete all passwords associated with that folder. 
    //It "cascades" the deletion from the parent to the children
export default db;