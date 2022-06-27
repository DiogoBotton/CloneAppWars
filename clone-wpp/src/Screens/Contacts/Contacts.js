import { View, Text, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { askPermissionForContactsAndGetAllContacts } from "../../Utils";
import ListItem from '../../Components/ListItem/ListItem';
import { db } from "../../../firebase";
import GlobalContext from '../../Context/Context';
import { onSnapshot, query, collection, where } from "firebase/firestore";
import { useRoute } from '@react-navigation/native';

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const route = useRoute();

    useEffect(() => {
        (async () => {
            const resultContacts = await askPermissionForContactsAndGetAllContacts();
            setContacts(resultContacts);
        })()
    }, [])

    return (
        <FlatList
            style={{
                flex: 1,
                padding: 10,
            }}
            data={contacts}
            keyExtractor={(_, i) => i}
            renderItem={({ item }) => <ContactPreview contact={item} />}
        />
    )
}

const ContactPreview = (contact) => {
    const [user, setUser] = useState(contact);
    const { rooms, unfilteredRooms } = useContext(GlobalContext);

    useEffect(() => {
        const q = query(
            collection(db, "Users"),
            where("email", "==", contact.contact.email)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (snapshot.docs.length) {
                const userDoc = snapshot.docs[0].data();
                setUser((prevUser) => ({ ...prevUser, userDoc }));
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <ListItem
            room={unfilteredRooms.find(r => r.participantsArray.includes(contact.contact.email))}
            user={user}
            type="contacts"
            style={{
                marginTop: 7
            }}
        />
    )
}