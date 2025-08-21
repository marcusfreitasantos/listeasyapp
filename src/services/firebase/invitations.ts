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
