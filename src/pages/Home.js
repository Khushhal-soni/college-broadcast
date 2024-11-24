import React from 'react';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, set, get } from 'firebase/database';


export default function HomePage() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const googleprovider = new GoogleAuthProvider();
  googleprovider.setCustomParameters({
    prompt: 'select_account' 
  });

  
  const checkUserExistence = async () => {
    try {
      const result = await signInWithPopup(auth, googleprovider); 
      const user = result.user;
      const database = getDatabase();
      const useref = ref(database, 'users/' + user.uid); 

      const snapshot = await get(useref);

      if (snapshot.exists()) {
        // console.log("Existing user detected:", snapshot.val());
        navigate('/chat-options'); 
      } else {
        console.log("New user detected, saving data...");
        const uniquename = await fetchRandomName();
        await saveUserData(uniquename, user.displayName, user.email, user.uid);
        navigate('/chat-options'); 
      }
    } catch (error) {
      console.error("Error during sign-in or user check:", error);
      alert("Sign-in failed. Please try again.");
    }
  };

  const saveUserData = (uniquename, name, email, uid) => {
    const database = getDatabase();
    const useref = ref(database, 'users/' + uid);
    set(useref, {
      uniquename: uniquename,
      name: name,
      email: email,
      uid: uid,
    })
      .then(() => {
        console.log("User data successfully saved to Firebase!");
      })
      .catch((error) => {
        console.error("Error saving user data to Firebase:", error);
      });
  };

  const fetchRandomName = async () => {
    try {
      const response = await fetch('https://fakerapi.it/api/v2/users?_quantity=1');
      const data = await response.json();
      const name = data.data[0].firstname;
      console.log(name);
      return name;
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-950 flex flex-col items-center justify-center p-4 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_100%)] animate-pulse" />
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            College Broadcast
          </span>
          <span className="inline-block animate-bounce ml-2">🎙️</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
          Express your thoughts, anonymously, and share your college experiences.
        </p>
        <div className="space-y-6">
          <button
            onClick={checkUserExistence} 
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Sign in With Google
          </button>
        </div>
        <p className="text-white-400 mt-6 text-sm md:text-base font-serif italic tracking-wide leading-relaxed">
          sign-up ones— than express yourself!
        </p>
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed" />
      </div>
    </div>
  );
}