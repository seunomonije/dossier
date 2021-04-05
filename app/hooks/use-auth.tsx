// @ts-nocheck
import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactChild,
} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

// Add your Firebase credentials
firebase.initializeApp({
  apiKey: 'AIzaSyB8t3YC11TE-SY268nRTpmoEAW8p4CAhS4',
  authDomain: 'dossier-cb890.firebaseapp.com',
  projectId: 'dossier-cb890',
  appId: '1:955615741651:web:dff68ca6fc1d8bd89cb626',
});

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  // @ts-ignore
  return <authContext.Provider value={auth}> {children} </authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext) as ContextType;
};

// Provider hook that creates auth object and handles state
export function useProvideAuth() {
  // const [username, setUserName] = useState(null);
  const [currentUser, setUser] = useState();
  const [userName, setUserName] = useState();

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signup = (email, password, userName) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        response.user?.updateProfile({
          displayName: userName,
        });

        setUser(response.user);
        setUserName(userName);
        return response.user;
      });
  };

  const signout = () => {
    return firebase.auth().signOut();
  };

  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((res) => {
          console.log(res);
          return res;
        });

        setUser(user);
      }
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  return {
    currentUser,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };

  // Return the user object and auth methods
  // return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
