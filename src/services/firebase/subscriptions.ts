import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  FirebaseFirestoreTypes,
  addDoc,
} from "@react-native-firebase/firestore";

import { SubscriptionEntity } from "@/src/features/subscriptions/model/subscription";
import { PlatformOSType } from "react-native";

const subsCollection = collection(getFirestore(), "Subscriptions");

export const insertNewSubscription = async (
  userId: string,
  productId: string,
  userName: string,
  userEmail: string,
  status: "active" | "inactive",
  platform: PlatformOSType,
  purchaseId: string,
  purchaseToken: string
) => {
  try {
    const subscriberData: SubscriptionEntity = {
      userId,
      productId,
      userName,
      userEmail,
      status,
      platform,
      purchaseId,
      purchaseToken,
    };

    await addDoc(subsCollection, subscriberData);
    return true;
  } catch (error: any) {
    throw new Error(`Error inserting new subscrition: ${error}`);
  }
};

export const getSubscriptionByUserId = async (userId: string) => {
  try {
    const queryCommand = query(subsCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(queryCommand);

    return querySnapshot.docs.map(
      (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<SubscriptionEntity>) =>
        ({
          id: doc.ref.id,
          ...doc.data(),
        } as SubscriptionEntity)
    );
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching subscription by userId: ${error}`);
  }
};

export const getSubscriptionByUserEmail = async (userEmail: string) => {
  try {
    const queryCommand = query(
      subsCollection,
      where("userEmail", "==", userEmail)
    );
    const querySnapshot = await getDocs(queryCommand);

    return querySnapshot.docs.map(
      (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<SubscriptionEntity>) =>
        ({
          id: doc.ref.id,
          ...doc.data(),
        } as SubscriptionEntity)
    );
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching subscription by userId: ${error}`);
  }
};
