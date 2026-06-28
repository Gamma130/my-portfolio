import "server-only";
import { AsyncDatabase } from "promised-sqlite3";
import Database from "better-sqlite3";
import path from "node:path";

// define the db
let _db: Database.Database | null = null;

//load the db file and create a db object
export function getDb(): Database.Database {
  if (_db) return _db;

  const dbPath = path.join(process.cwd(), "db", "portfolio.db");
  _db = new Database(dbPath, { readonly: true, fileMustExist: true });
  _db.pragma("foreign_keys = ON");
  return _db;
}
