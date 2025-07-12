import firestore from "@react-native-firebase/firestore";
import { ListEntityType } from "@/src/features/listsManager/model/list";

const listsCollection = firestore().collection("Lists");

export const insertNewList = async (listEntity: ListEntityType) => {
  try {
    const listObj = {
      ...listEntity,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    await listsCollection.add(listObj);
    console.log("List added!");
    return true;
  } catch (error: any) {
    throw new Error(`Error adding list: ${error}`);
  }
};

export const getListsByAuthorId = async (
  userId: string
): Promise<ListEntityType[]> => {
  try {
    const querySnapshot = await listsCollection
      .where("authorId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as ListEntityType)
    );
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching lists by authorId: ${error}`);
  }
};

export const removeListById = async (listId: string) => {
  try {
    await listsCollection.doc(listId).delete();
    console.log("List removed");
  } catch (error) {
    throw new Error(`Error removing list: ${error}`);
  }
};
