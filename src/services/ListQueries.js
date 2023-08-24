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

export async function upDateListTotal(list) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "UPDATE Lists SET listTotal = ? WHERE listID = ?;",
        [list.listTotal, list.listID],
        () => {
          resolve("Total da lista atualizado com sucesso!");
        }
      );
    });
  });
}

export async function upDateListName(list) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "UPDATE Lists SET listName = ? WHERE listID = ?;",
        [list.listName, list.listID],
        () => {
          resolve("Nome da lista atualizado com sucesso!");
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
