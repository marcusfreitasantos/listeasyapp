import { InviteEntity } from "@/src/features/invitation/model/invite";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  FirebaseFirestoreTypes,
  serverTimestamp,
  addDoc,
} from "@react-native-firebase/firestore";

const invitesCollection = collection(getFirestore(), "Invites");

export const insertNewInvite = async (invite: InviteEntity) => {
  try {
    const inviteObj = {
      ...invite,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await addDoc(invitesCollection, inviteObj);
    return true;
  } catch (error: any) {
    throw new Error(`Error adding invite: ${error}`);
  }
};

export const getInvitesByUserEmail = async (
  userEmail: string,
): Promise<InviteEntity[]> => {
  try {
    const queryCommand = query(
      invitesCollection,
      where("userEmail", "==", userEmail),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(queryCommand);

    return querySnapshot.docs.map(
      (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<InviteEntity>) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as InviteEntity,
    );
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching invites by userEmail: ${error}`);
  }
};

export const getInvitesSentByCurrentUser = async (
  userId: string,
): Promise<InviteEntity[]> => {
  try {
    const queryCommand = query(
      invitesCollection,
      where("referralUserId", "==", userId),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(queryCommand);

    return querySnapshot.docs.map(
      (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<InviteEntity>) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as InviteEntity,
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
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    throw new Error(`Error updating invite: ${error}`);
  }
};

export const removeInviteById = async (inviteId: string) => {
  try {
    await deleteDoc(doc(invitesCollection, inviteId));
  } catch (error) {
    throw new Error(`Error removing invite: ${error}`);
  }
};
