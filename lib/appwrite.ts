import { Account, Client, Databases, Storage } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

export const account = new Account(client);
export const databases = new Databases(client);

export const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
export const userCollectionId = process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!;