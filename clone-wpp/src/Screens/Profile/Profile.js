import { View, Text, TouchableOpacity, Image, TextInput, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Context from "../../Context/Context";
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { pickImage, askPermissionForCamera } from "../../Utils";
import { auth, db } from "../../../firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { uploadImage } from "../../Utils";
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
    const { theme: { colors } } = useContext(Context);
    const [displayName, setDisplayName] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [permissionCameraStatus, setPermissionCameraStatus] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const status = await askPermissionForCamera();
            setPermissionCameraStatus(status);
        })();
    }, [])

    if (!permissionCameraStatus)
        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Carregando...</Text></View>

    const SaveProfile = async () => {
        const user = auth.currentUser
        let photoUrl = null;

        if (selectedImage) {
            const { url } = await uploadImage(
                selectedImage,
                `images/${user.uid}`,
                "profileImage"
            );
            photoUrl = url;
        }

        await updateProfile(user, {
            displayName: displayName,
            photoURL: photoUrl
        })

        await setDoc(doc(db, "Users", user.uid), {
            displayName: user.displayName,
            email: user.email,
            photoUrl: photoUrl
        })

        navigation.navigate("home");
    }

    const handleProfileImage = async () => {
        const result = await pickImage();
        if (!result.cancelled) {
            setSelectedImage(result)
        }
    }

    return (
        <React.Fragment>
            <StatusBar style="auto" />
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                paddingTop: Constants.statusBarHeight + 20,
                padding: 20
            }}>
                <Text style={{ fontSize: 22, color: colors.foreground }}>
                    Informações do Perfil
                </Text>
                <Text style={{ fontSize: 14, color: colors.text, marginTop: 20 }}>
                    Adicione seu nome e sua foto opcional de perfil
                </Text>
                <TouchableOpacity
                    onPress={handleProfileImage}
                    style={{
                        marginTop: 30,
                        borderRadius: 120,
                        width: 120,
                        height: 120,
                        backgroundColor: colors.background,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    {!selectedImage ? (
                        <MaterialCommunityIcons
                            name="camera-plus"
                            color={colors.iconGray}
                            size={45}
                        />
                    ) : (
                        <Image
                            source={{ uri: selectedImage.uri }}
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 120
                            }}
                        />
                    )}
                </TouchableOpacity>
                <TextInput
                    placeholder='Nome'
                    onChangeText={setDisplayName}
                    value={displayName}
                    style={{
                        borderBottomColor: colors.primary,
                        borderBottomWidth: 2,
                        marginTop: 40,
                        width: "100%"
                    }}
                />
                <View style={{
                    marginTop: "auto", width: 95
                }}>
                    <Button
                        title="Avançar"
                        color={colors.secondary}
                        disabled={!displayName}
                        onPress={SaveProfile}
                    />
                </View>
            </View>
        </React.Fragment>
    )
}