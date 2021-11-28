import { createContext, useState, useContext, useEffect } from "react";
import { auth, provider } from "../Lib/firebase";
import firebase from "firebase";

const AddClassContext = createContext();

export function useLocalContext() {
  return useContext(AddClassContext);
}

export function ContextProvider({ children }) {
  const [createClassDialog, setCreateClassDialog] = useState(false);
  const [joinClassDialog, setJoinClassDialog] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedInMail, setLoggedInMail] = useState(null);
  const [userType, setUserType] = useState("");
  const [classesArray, setClassesArray] = useState([]);
  const [currClass, setCurrClass] = useState(null);

  const login = (type) => {
    setUserType(type);
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        setLoggedInUser(result.user);
        setLoggedInMail(result.user.email);
        console.log("Success");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        setLoggedInUser(null);
        setLoggedInMail(null);
        console.log("login Failed",error);
        // ...
      });
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        setLoggedInUser(null);
        setLoggedInMail(null);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const value = {
    createClassDialog,
    setCreateClassDialog,
    joinClassDialog,
    setJoinClassDialog,
    login,
    logout,
    loggedInUser,
    loggedInMail,
    userType,
    classesArray,
    setClassesArray,
    currClass,
    setCurrClass,
  };
  return (
    <AddClassContext.Provider value={value}>
      {children}
    </AddClassContext.Provider>
  );
}
