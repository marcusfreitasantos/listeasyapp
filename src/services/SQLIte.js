import * as SQLite from "expo-sqlite";

function dataBaseConection() {
  const database = SQLite.openDatabase("db.db");
  return database;
}

export const db = dataBaseConection();
