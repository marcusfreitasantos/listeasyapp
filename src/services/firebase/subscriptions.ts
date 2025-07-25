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

const subsCollection = collection(getFirestore(), "Subscribers");

export const insertNewSubscriber = async (
  userId: string,
  stripeCustomerId: string
) => {
  try {
    const subscriberData = {
      userId,
      stripeCustomerId,
      stripeSubscriptionStatus: "inactive",
    };

    console.log("Inserting user in Users collection:", subscriberData);
    await subsCollection.add(subscriberData);
    return true;
  } catch (error: any) {
    throw new Error(`Error adding list: ${error}`);
  }
};

export const getSubscriberByUserId = async (userId: string) => {
  try {
    const queryCommand = query(subsCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(queryCommand);

    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching lists by authorId: ${error}`);
  }
};
