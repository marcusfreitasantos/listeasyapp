import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  getDoc,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  FirebaseFirestoreTypes,
  serverTimestamp,
  addDoc,
} from "@react-native-firebase/firestore";
import { ListEntityType } from "@/src/features/listsManager/model/list";
import { useObservabilityViewModel } from "@/src/features/observability/viewModel/useObservabilityViewModel";

const { withPerformanceTrace } = useObservabilityViewModel();
const listsCollection = collection(getFirestore(), "Lists");

export const insertNewList = async (listEntity: ListEntityType) => {
  return withPerformanceTrace("firestore_create_list", async () => {
    try {
      const listObj = {
        ...listEntity,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await addDoc(listsCollection, listObj);
      return true;
    } catch (error: any) {
      throw new Error(`Error adding list: ${error}`);
    }
  });
};

export const getListById = async (listId: string): Promise<ListEntityType> => {
  return withPerformanceTrace("firestore_fetch_list", async () => {
    try {
      const docSnap: FirebaseFirestoreTypes.DocumentSnapshot<ListEntityType> =
        await getDoc(doc(listsCollection, listId));

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        } as ListEntityType;
      } else {
        throw new Error("No such document!");
      }
    } catch (error) {
      console.log(error);
      throw new Error(`Error fetching list by list ID: ${error}`);
    }
  });
};

export const getListsByAuthorId = async (
  userId: string,
): Promise<ListEntityType[]> => {
  return withPerformanceTrace("firestore_fetch_lists_author", async () => {
    try {
      const queryCommand = query(
        listsCollection,
        where("authorId", "==", userId),
        orderBy("createdAt", "desc"),
      );
      const querySnapshot = await getDocs(queryCommand);

      return querySnapshot.docs.map(
        (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<ListEntityType>) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as ListEntityType,
      );
    } catch (error) {
      console.log(error);
      throw new Error(`Error fetching lists by authorId: ${error}`);
    }
  });
};

export const getListsByColaboratorId = async (
  userId: string,
): Promise<ListEntityType[]> => {
  return withPerformanceTrace("firestore_fetch_lists_shared", async () => {
    try {
      const queryCommand = query(
        listsCollection,
        where("colaboratorsIds", "array-contains", userId),
      );
      const querySnapshot = await getDocs(queryCommand);

      return querySnapshot.docs.map(
        (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<ListEntityType>) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as ListEntityType,
      );
    } catch (error) {
      console.log(error);
      throw new Error(`Error fetching lists by colaboratorsId: ${error}`);
    }
  });
};

export const updateListContent = async (currentList: ListEntityType) => {
  return withPerformanceTrace("firestore_update_list", async () => {
    try {
      const listRef = doc(listsCollection, currentList.id);
      await updateDoc(listRef, {
        ...currentList,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      throw new Error(`Error updating list: ${error}`);
    }
  });
};

export const removeListById = async (listId: string) => {
  return withPerformanceTrace("firestore_delete_list", async () => {
    try {
      await deleteDoc(doc(listsCollection, listId));
    } catch (error) {
      throw new Error(`Error removing list: ${error}`);
    }
  });
};
