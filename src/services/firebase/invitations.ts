import { InviteEntity } from "@/src/features/invitation/model/invite";
import firestore, {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  orderBy,
  doc,
  updateDoc,
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

const invitesCollection = collection(getFirestore(), "Invites");

export const insertNewInvite = async (invite: InviteEntity) => {
  try {
    const inviteObj = {
      ...invite,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    };
    await invitesCollection.add(inviteObj);
    return true;
  } catch (error: any) {
    throw new Error(`Error adding invite: ${error}`);
  }
};

export const getInvitesByUserEmail = async (
  userEmail: string
): Promise<InviteEntity[]> => {
  try {
    const queryCommand = query(
      invitesCollection,
      where("userEmail", "==", userEmail),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(queryCommand);

    return querySnapshot.docs.map(
      (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<InviteEntity>) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as InviteEntity)
    );
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching invites by userEmail: ${error}`);
  }
};

export const updateInvite = async (invite: InviteEntity) => {
  try {
    const listRef = doc(invitesCollection, invite.id);
    await updateDoc(listRef, {
      ...invite,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    throw new Error(`Error updating invite: ${error}`);
  }
};
