import React, { useState, useEffect } from 'react';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAssets } from 'expo-asset';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "./firebase";
import Routes from "./src/routes.js";
import ContextWrapper from './src/Context/ContextWrapper';
LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setloading(false);
      if (user)
        setCurrUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text>Carregando...</Text>
  }

  return (
    <Routes currentUser={currUser} />
  );
}

export default function Main() {
  const assets = useAssets(
    require("./assets/icon-square.png"),
    require("./assets/chatbg.png"),
    require("./assets/user-icon.png"),
    require("./assets/welcome-img.png")
  );

  if (!assets)
    return <Text>Carregando...</Text>

  return (
    <ContextWrapper>
      <App />
    </ContextWrapper>
  )
}