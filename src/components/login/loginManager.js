import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './fire-base-config';




export const initializeLoginFramework = () =>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
       
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success : true
        }
        return signedInUser;
      })
      .catch(error => {
        console.log(error);
        console.log(error.message);
      })
  }


  
export const handleFbSignIn = () =>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;     
      var user = result.user;
      user.success = true;
      return user;
     
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }

 export const handleSignOut = () =>{
    return firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn : false,
        name : '',
        photo : '',
        email : '',
        error : '',
        success : false
      }
      return signedOutUser;
    })
    .catch(error =>{
      console.log(error);
    })
  }

  export const createUserWithEmailAndPassword = (name ,email,password) =>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res=>{
      const newUserInfo = res.user;
      newUserInfo.error =   '' ;
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch(error=>  {
      const newUserInfo = {}
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  export const signInWithEmailAndPassword = (email, password) =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res=>{
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch(function(error) {
      const newUserInfo = {}
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  const updateUserName = name =>{
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log("User Name Updated successfully..")
    }).catch(function(error) {
      console.log(error);
    });
  }