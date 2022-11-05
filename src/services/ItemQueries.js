import { db } from "./SQLIte";

export function createItemsTable() {
  db.transaction((transaction) => {
    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "Items " +
        "(itemID INTEGER PRIMARY KEY AUTOINCREMENT, listID INT, itemName VARCHAR(50), itemPrice FLOAT, itemQnt INT, itemTotal FLOAT);"
    );
  });
}

export async function createNewItem(item) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "INSERT INTO Items (itemName, itemPrice, itemQnt, itemTotal, listID) VALUES (?,?,?,?,?);",
        [item.itemName, item.itemPrice, item.itemQnt, item.itemTotal, item.listID],
        () => {
          resolve("Item criado com sucesso!");
        }
      );
    });
  });
}

export async function getItems(listID) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM Items WHERE listID = ?;",
        [listID],
        (transaction, results) => {
          resolve(results.rows._array);
        }
      );
    });
  });
}

export async function upDateItem(item) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "UPDATE Items SET itemName = ?, itemPrice = ?, itemQnt = ?, itemTotal = ? WHERE itemID = ?;",
        [item.itemName, item.itemPrice, item.itemQnt, item.itemTotal, item.itemID],
        () => {
          resolve("Item atualizado com sucesso!");
        }
      );
    });
  });
}

export async function deleteItem(itemID) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "DELETE FROM Items WHERE itemID = ?;",
        [itemID],
        () => {
          resolve(true);
        }
      );
    });
  });
}
