import Database from 'better-sqlite3';

// Check root dev.db
const db1 = new Database('C:/Users/naugs/Desktop/Propuesta/logistica-app/dev.db');
const tables1 = db1.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('Root dev.db tables:', tables1);
db1.close();

// Check prisma/dev.db
const db2 = new Database('C:/Users/naugs/Desktop/Propuesta/logistica-app/prisma/dev.db');
const tables2 = db2.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('prisma/dev.db tables:', tables2);
db2.close();
