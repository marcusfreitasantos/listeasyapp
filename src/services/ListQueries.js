import { db } from "./SQLIte";

export function createListsTable() {
  db.transaction((transaction) => {
    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "Lists " +
        "(listID INTEGER PRIMARY KEY AUTOINCREMENT, listName VARCHAR(500), listTotal FLOAT);"
    );
  });
}

export async function createNewList(list) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "INSERT INTO Lists (listName, listTotal) VALUES (?,?);",
        [list.listName, list.listTotal],
        () => {
          resolve("Lista criada com sucesso!");
        }
      );
    });
  });
}

export async function getLists() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM Lists;",
        [],
        (transaction, results) => {
          resolve(results.rows._array);
        }
      );
    });
  });
}

export async function upDateList(list) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "UPDATE Lists SET listName = ?, listTotal = ? WHERE listID = ?;",
        [list.listName, list.listTotal, list.listID],
        () => {
          resolve("Lista atualizada com sucesso!");
        }
      );
    });
  });
}

export async function deleteLists(listID) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "DELETE FROM Lists WHERE listID = ?;",
        [listID],
        () => {
          resolve("Lista removida com sucesso!");
        }
      );
    });
  });
}
