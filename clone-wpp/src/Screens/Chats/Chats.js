import { View, Text } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import Context from "../../Context/Context"
import ContactsIcon from '../../Components/ContactsIcon/ContactsIcon';

export default function Chats() {
  const { currentUser } = auth;
  const { rooms, setRooms } = useContext(Context);

  useEffect(() => {
    const chats = query(collection(db, "Rooms"), where("participantsArray", "array-contains", currentUser.email))

    const unsub = onSnapshot(chats, (querySnapshot) => {
      const filteredChats = querySnapshot.docs.filter(doc => {
        doc.data().lastMessage
      }).map(doc => ({
        ...doc.data(),
        id: doc.id,
        userB: doc.data().participants.find(x => x.email !== currentUser.email)
      }))
      setRooms(filteredChats);
    });

    return () => unsub();
  }, [])

  return (
    <View style={{
      flex: 1,
      padding: 5,
      paddingRight: 10
    }}>
      <Text>Chats</Text>
      <ContactsIcon />
    </View>
  )
}