import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  FirebaseFirestoreTypes,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "@react-native-firebase/firestore";

import { SubscriptionEntity } from "@/src/features/subscriptions/model/subscription";
import { PlatformOSType } from "react-native";

const subsCollection = collection(getFirestore(), "Subscriptions");

const definedFields = (data: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined),
  );

const findSubscriptionDocs = async (
  field: string,
  value?: string,
): Promise<FirebaseFirestoreTypes.QueryDocumentSnapshot[]> => {
  const normalized = value?.trim();
  if (!normalized) return [];

  const snapshot = await getDocs(
    query(subsCollection, where(field, "==", normalized)),
  );
  return snapshot.docs;
};

const usesGeneratedDocumentId = (
  documentId: string,
  subscription: { appAccountToken?: string; originalTransactionId?: string },
) =>
  documentId !== subscription.appAccountToken?.trim() &&
  documentId !== subscription.originalTransactionId?.trim();

const saveIosSubscription = async (
  subscription: SubscriptionEntity | Omit<SubscriptionEntity, "status" | "purchaseId" | "purchaseToken">,
) => {
  const matches = new Map<
    string,
    FirebaseFirestoreTypes.QueryDocumentSnapshot
  >();
  const lookups = [
    ["appAccountToken", subscription.appAccountToken],
    ["originalTransactionId", subscription.originalTransactionId],
    ["purchaseId", subscription.originalTransactionId],
  ] as const;

  for (const [field, value] of lookups) {
    const docs = await findSubscriptionDocs(field, value);
    docs.forEach((matched) => matches.set(matched.id, matched));
  }

  const existingDocs = [...matches.values()];
  const generatedDoc = existingDocs.find((matched) =>
    usesGeneratedDocumentId(matched.id, subscription),
  );
  const payload = definedFields({ ...subscription });

  if (generatedDoc) {
    await updateDoc(generatedDoc.ref, payload);
    await Promise.all(
      existingDocs
        .filter((matched) => matched.id !== generatedDoc.id)
        .map((matched) => deleteDoc(matched.ref)),
    );
    return generatedDoc.id;
  }

  const created = await addDoc(subsCollection, payload);
  await Promise.all(existingDocs.map((matched) => deleteDoc(matched.ref)));
  return created.id;
};

export const reserveIosSubscription = async ({
  appAccountToken,
  userId,
  userEmail,
  userName,
  productId,
}: {
  appAccountToken: string;
  userId: string;
  userEmail: string;
  userName: string;
  productId: string;
}) =>
  saveIosSubscription({
    userId,
    userEmail,
    userName,
    productId,
    platform: "ios",
    appAccountToken,
  });

export const upsertIosSubscription = async (
  subscription: SubscriptionEntity,
) => {
  if (
    !subscription.appAccountToken?.trim() &&
    !subscription.originalTransactionId?.trim()
  ) {
    throw new Error("Missing appAccountToken");
  }

  return saveIosSubscription(subscription);
};

export const insertNewSubscription = async (
  userId: string,
  productId: string,
  userName: string,
  userEmail: string,
  status: "active" | "inactive",
  platform: PlatformOSType,
  purchaseId: string,
  purchaseToken: string,
  appAccountToken: string,
  originalTransactionId?: string,
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
      appAccountToken,
      ...(originalTransactionId ? { originalTransactionId } : {}),
    };

    const subscriptionInserted = await addDoc(subsCollection, subscriberData);
    return subscriptionInserted._documentPath._parts[1];
  } catch (error: any) {
    throw new Error(`Error inserting new subscrition: ${error}`);
  }
};

export const switchSubscription = async (
  currentSubscription: SubscriptionEntity,
) => {
  try {
    const listRef = doc(subsCollection, currentSubscription.id);
    await updateDoc(listRef, {
      ...currentSubscription,
    });
  } catch (error) {
    throw new Error(`Error updating subscription: ${error}`);
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
        }) as SubscriptionEntity,
    );
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching subscription by userId: ${error}`);
  }
};

export const getSubscriptionByPurchaseToken = async (purchaseToken: string) => {
  try {
    const queryCommand = query(
      subsCollection,
      where("purchaseToken", "==", purchaseToken),
    );
    const querySnapshot = await getDocs(queryCommand);

    return querySnapshot.docs.map(
      (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<SubscriptionEntity>) =>
        ({
          id: doc.ref.id,
          ...doc.data(),
        }) as SubscriptionEntity,
    )[0];
  } catch (error) {
    throw new Error(`Error fetching subscription by purchaseToken: ${error}`);
  }
};

export const getSubscriptionByUserEmail = async (userEmail: string) => {
  try {
    const queryCommand = query(
      subsCollection,
      where("userEmail", "==", userEmail),
    );
    const querySnapshot = await getDocs(queryCommand);

    return querySnapshot.docs.map(
      (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<SubscriptionEntity>) =>
        ({
          id: doc.ref.id,
          ...doc.data(),
        }) as SubscriptionEntity,
    );
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching subscription by userEmail: ${error}`);
  }
};
