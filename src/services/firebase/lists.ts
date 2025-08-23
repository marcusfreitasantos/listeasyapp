import firestore, {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  getDoc,
  orderBy,
  doc,
  updateDoc,
} from "@react-native-firebase/firestore";
import { ListEntityType } from "@/src/features/listsManager/model/list";

const listsCollection = collection(getFirestore(), "Lists");

export const insertNewList = async (listEntity: ListEntityType) => {
  try {
    const listObj = {
      ...listEntity,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    };
    await listsCollection.add(listObj);
    return true;
  } catch (error: any) {
    throw new Error(`Error adding list: ${error}`);
  }
};

export const getListById = async (listId: string): Promise<ListEntityType> => {
  try {
    const docSnap = await getDoc(doc(listsCollection, listId));

    if (docSnap.exists()) {
      return docSnap.data() as ListEntityType;
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching list by list ID: ${error}`);
  }
};

export const getListsByAuthorId = async (
  userId: string
): Promise<ListEntityType[]> => {
  try {
    const queryCommand = query(
      listsCollection,
      where("authorId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(queryCommand);

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

export const getListsByColaboratorId = async (
  userId: string
): Promise<ListEntityType[]> => {
  try {
    const queryCommand = query(
      listsCollection,
      where("colaboratorsIds", "array-contains", userId)
    );
    const querySnapshot = await getDocs(queryCommand);

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as ListEntityType)
    );
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching lists by colaboratorsId: ${error}`);
  }
};

export const updateListContent = async (currentList: ListEntityType) => {
  try {
    const listRef = doc(listsCollection, currentList.id);
    await updateDoc(listRef, {
      ...currentList,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    throw new Error(`Error updating list: ${error}`);
  }
};

export const removeListById = async (listId: string) => {
  try {
    await listsCollection.doc(listId).delete();
  } catch (error) {
    throw new Error(`Error removing list: ${error}`);
  }
};
