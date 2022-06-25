import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { nanoid } from "nanoid"
import "react-native-get-random-values"

// Escolher imagem
export async function pickImage() {
    let result = ImagePicker.launchCameraAsync();
    return result;
}

// Requisitar permissão da camêra
export async function askForPermission() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status;
}

// Upload de imagem para firebase
export async function uploadImage(file, path, fName) {
    const fileName = fName || nanoid();
    const storageRef = ref(storage, `${path}/${fileName}`);

    const snapshot = await uploadBytes(storageRef, file);

    const url = await getDownloadURL(snapshot.ref);

    return { url, fileName };
}

const palette = {
    tealGreen: "#128c7e",
    tealGreenDark: "#075e54",
    green: "#25d366",
    lime: "#dcf8c6",
    skyblue: "#34b7f1",
    smokeWhite: "#ece5dd",
    white: "white",
    gray: "#3C3C3C",
    lightGray: "#757575",
    iconGray: "#717171",
};

export const theme = {
    colors: {
        background: palette.smokeWhite,
        foreground: palette.tealGreenDark,
        primary: palette.tealGreen,
        tertiary: palette.lime,
        secondary: palette.green,
        white: palette.white,
        text: palette.gray,
        secondaryText: palette.lightGray,
        iconGray: palette.iconGray,
    },
}