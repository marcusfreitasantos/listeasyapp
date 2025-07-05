type UserEntity = {
  additionalUserInfo: { isNewUser: boolean };
  user: {
    displayName: null;
    email: string;
    emailVerified: false;
    isAnonymous: false;
    metadata: [Object];
    multiFactor: [Object];
    phoneNumber: null;
    photoURL: null;
    providerData: [];
    providerId: string;
    tenantId: null;
    uid: string;
  };
};

export { UserEntity };
