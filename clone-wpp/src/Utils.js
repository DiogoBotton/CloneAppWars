import * as ImagePicker from "expo-image-picker";
import * as Contacts from "expo-contacts"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { nanoid } from "nanoid"
import "react-native-get-random-values"

export async function askPermissionForContactsAndGetAllContacts() {
    const { status } = await Contacts.requestPermissionsAsync();
    let contacts = [];

    if (status == "granted") {
        const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Emails]
        });

        if (data.length > 0) {
            contacts = data.filter(c =>
                c.firstName &&
                c.emails &&
                c.emails[0] &&
                c.emails[0].email
            ).map(c => ({
                contactName: c.firstName && c.lastName ? `${c.firstName} ${c.lastName}` : c.firstName,
                email: c.emails[0].email
            }))
        }
    }

    return contacts;
}

// Escolher imagem
export async function pickImage() {
    let result = ImagePicker.launchCameraAsync();
    return result;
}

// Requisitar permissão da camêra
export async function askPermissionForCamera() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status;
}

// Upload de imagem para firebase
export async function uploadImage(file, path, fName) {
    // Transformando URI em Blob
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", file.uri, true);
        xhr.send(null);
      });

    const fileName = fName || nanoid();
    const storageRef = ref(storage, `${path}/${fileName}.jpeg`);

    const snapshot = await uploadBytes(storageRef, blob, {
        contentType: "image/jpeg",
    });

    blob.close();

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