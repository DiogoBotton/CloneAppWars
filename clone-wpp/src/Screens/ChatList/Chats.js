import { View, Text } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import Context from "../../Context/Context"
import ContactsIcon from '../../Components/ContactsIcon/ContactsIcon';
import ListItem from '../../Components/ListItem/ListItem';
import { askPermissionForContactsAndGetAllContacts } from "../../Utils";

export default function Chats() {
  const { currentUser } = auth;
  const { rooms, unfilteredRooms, setRooms, setUnfilteredRooms } = useContext(Context);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const chats = query(collection(db, "Rooms"), where("participantsArray", "array-contains", currentUser.email))

      const resultContacts = await askPermissionForContactsAndGetAllContacts();
      setContacts(resultContacts);

      const unsub = onSnapshot(chats, (querySnapshot) => {
        const chats = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          userB: doc.data().participants.find(x => x.email !== currentUser.email)
        }))
        setUnfilteredRooms(chats)
        setRooms(chats.filter(doc => doc.lastMessage));
      });

      return () => unsub();
    })()
  }, []);

  const GetUserB = (user) => {
    const userContact = contacts.find(c => c.email == user.email);

    if (userContact && userContact.contactName)
      return { ...user, contactName: userContact.contactName }

    return user;
  }

  return (
    <View style={{
      flex: 1,
      padding: 5,
      paddingRight: 10
    }}>
      {rooms.map((room) => {
        <ListItem
          type="chat"
          description={room.lastMessage.text}
          key={room.id}
          room={room}
          time={room.lastMessage.createdAt}
          user={GetUserB(room.userB)}
        />
      })}
      <ContactsIcon />
    </View>
  )
}