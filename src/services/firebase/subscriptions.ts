import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  doc,
  updateDoc,
} from "@react-native-firebase/firestore";

import { SubscriptionEntity } from "@/src/features/subscriptions/model/subscription";

const subsCollection = collection(getFirestore(), "Subscriptions");

export const insertNewSubscription = async (
  userId: string,
  stripeCustomerId: string,
  userName: string,
  userEmail: string
) => {
  try {
    const subscriberData: SubscriptionEntity = {
      userId,
      stripeCustomerId,
      stripeSubscriptionStatus: "inactive",
      productId: "",
      userName,
      userEmail,
      stripeSubscriptionId: "",
    };

    await subsCollection.add(subscriberData);
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
      (doc) =>
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
      (doc) =>
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

export const updateSubscription = async (subscription: SubscriptionEntity) => {
  try {
    const subscriptionRef = doc(subsCollection, subscription.id);
    const { id, ...subscriptionData } = subscription;

    await updateDoc(subscriptionRef, {
      ...subscriptionData,
    });
  } catch (error) {
    throw new Error(`Error updating subscription: ${error}`);
  }
};
