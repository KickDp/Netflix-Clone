import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCRAFQNYtyPoRUtWicJLqyAzvFzR4D0HvI",
  authDomain: "netflix-clone-a8088.firebaseapp.com",
  projectId: "netflix-clone-a8088",
  storageBucket: "netflix-clone-a8088.firebasestorage.app",
  messagingSenderId: "601387722820",
  appId: "1:601387722820:web:e6a9ae35c6d1df7622b411"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email, password)=>{
   try{
      const res = await createUserWithEmailAndPassword(auth,email,password);
      const user = res.user;
      await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
      });
   }
   catch(error){
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
   }
}
const login = async (email, password) => {
   try{
        await signInWithEmailAndPassword(auth,email,password);
   }
   catch(error){
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
   } 
}
const logout = ()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};