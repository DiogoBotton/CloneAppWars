// @refresh reset
import { View, Text, ImageBackground } from 'react-native'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { auth, db } from '../../../firebase'
import { useRoute } from '@react-navigation/native';
import { nanoid } from 'nanoid';
import 'react-native-get-random-values';
import GlobalContext from '../../Context/Context';
import { collection, doc, setDoc, onSnapshot, addDoc, updateDoc } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';

const randomId = nanoid();

export default function Chat() {
    const { theme: { colors } } = useContext(GlobalContext);
    const { currentUser } = auth;
    const route = useRoute();
    const [messages, setMessages] = useState([]);

    const room = route.params.room;
    const roomId = room ? room.id : randomId;
    const selectedImage = route.params.image;
    const userB = route.params.user;
    const senderUser = currentUser.photoURL ? {
        name: currentUser.displayName,
        _id: currentUser.uid,
        avatar: currentUser.photoURL
    } : {
        name: currentUser.displayName,
        _id: currentUser.uid,
    };

    const roomRef = doc(db, "Rooms", roomId);
    const roomMessagesRef = collection(db, "Rooms", roomId, "Messages");

    useEffect(() => {
        (async () => {
            // Criando a sala
            if (!room) {
                const currUserData = {
                    displayName: currentUser.displayName,
                    email: currentUser.email
                }

                if (currentUser.photoURL)
                    currUserData.photoURL = currentUser.photoURL

                const userBData = {
                    displayName: userB.contact.contactName || userB.userDoc.displayName || "",
                    email: userB.userDoc.email
                }

                if (userB.userDoc.photoUrl)
                    userBData.photoURL = userB.userDoc.photoUrl

                const roomData = {
                    participants: [currUserData, userBData],
                    participantsArray: [currUserData.email, userBData.email]
                }

                await setDoc(roomRef, roomData)
                    .catch((error => {
                        console.log(error)
                    }))
            }

            // Resgatando mensagens da sala em tempo real
            const unsub = onSnapshot(roomMessagesRef, (snapshot) => {
                const messagesFirestore = snapshot.docChanges()
                    .filter(({ type }) => type === "added")
                    .map(({ doc }) => {
                        const message = doc.data();
                        return { ...message, createdAt: message.createdAt.toDate() }
                    });
                appendMessages(messagesFirestore);
            })

            return () => unsub();
        })()
    }, [])

    const appendMessages = useCallback((messages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    }, [messages]);

    const onSend = async (messages = []) => {
        const writes = messages.map(m => addDoc(roomMessagesRef, m))
        const lastMessage = messages[messages.length - 1]
        writes.push(updateDoc(roomRef, { lastMessage }))
        await Promise.all(writes);
    }

    return (
        <ImageBackground
            resizeMode="cover"
            source={require("../../../assets/chatbg.png")}
            style={{
                flex: 1
            }}
        >
            <GiftedChat
                onSend={onSend}
                messages={messages}
                user={senderUser}
            />
        </ImageBackground>
    )
}