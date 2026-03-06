import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import {
  account,
  databaseId,
  databases,
  userCollectionId,
} from "./appwrite";
import { uploadToCloudinary } from "./cloudinaryUpload";


// NOTE: we intentionally do not import the SignUp component here; the context
// should expose the signUp *function* instead.

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    name: string,
    email: string,
    password: string,
    imageUri: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      console.log("[CheckSession] Checking for existing session...");
      const currentUser = await account.get();
      setUser(currentUser);
      console.log("[CheckSession] User session found:", currentUser.email);
    } catch (error) {
      console.log("[CheckSession] No active session found", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };


  const signUp = async (
    name: string,
    email: string,
    password: string,
    image: string,
  ) => {
    try {
      console.log("[SignUp] Starting registration for:", email);


      console.log("[SignUp] Uploading profile image...");
      const imageId = await uploadToCloudinary(image);
      console.log("[SignUp] Image uploaded with ID:", imageId);

      console.log("[SignUp] Creating Appwrite account...");
      const newUser = await account.create(ID.unique(), email, password, name);
      console.log("[SignUp] Account created with ID:", newUser.$id);

      console.log("[SignUp] Creating user database document...");
      await databases.createDocument(
        databaseId,
        userCollectionId,
        newUser.$id,
        {
          name,
          email,
          imageId,
          savedPosts: [],
          likedPosts: [],
          createdGroups: [],
          joinedGroups: [],
          registeredEvents: [],
          createdEvents: [],
        },
      );
      console.log("[SignUp] User document created successfully");

      console.log("[SignUp] Signing in new user...");
      await signIn(email, password);
      console.log("[SignUp] User signed in successfully");

    } catch (error) {

      console.error("[SignUp] Registration failed:", error);
      setUser(null);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("[SignIn] Starting login for:", email);
      await account.createEmailPasswordSession(email, password);
      console.log("[SignIn] Session created");

      const currentUser = await account.get();
      setUser(currentUser);
      console.log("[SignIn] User logged in successfully");

    } catch (error) {
      console.error("[SignIn] Login failed:", error);
      setUser(null);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log("[SignOut] Logging out user...");
      await account.deleteSession("current");
      setUser(null);
      console.log("[SignOut] User logged out successfully");
    } catch (error) {
      console.error("[SignOut] Logout failed:", error);
      setUser(null);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
