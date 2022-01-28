import { useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import initializeAuthentication from "../Firebase/firebase.init";


initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // const [isAdmin, setIsAdmin] = useState(false);

  const auth = getAuth();

  // Sign Up
  const SignUpUser = (name, email, password, location, navigate) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = { email, displayName: name };
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => { })
          .catch((error) => { });
        const destination = location.state?.from || "/";
        saveUser(name, email, 'POST');
        navigate(destination);
        setUser(newUser);
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Sign In User by Form
  const SignInUser = (email, password, location, navigate) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const destination = location.state?.from || "/";
        navigate(destination);
        setUser(userCredential.user);
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Google Sign In
  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const saveUser = (name, email, action) => {
    const newUser = { name, email };
    fetch(`https://powerful-everglades-66107.herokuapp.com/users`, {
      method: action,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
  }

  // observer user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
  }, [auth]);

  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    user,
    authError,
    isLoading,
    // isAdmin,
    saveUser,
    setIsLoading,
    setUser,
    googleSignIn,
    SignUpUser,
    SignInUser,
    logOut,
  };
};

export default useFirebase;
