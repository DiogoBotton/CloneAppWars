import { TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import GlobalContext from '../../Context/Context'
import { useNavigation } from '@react-navigation/native';

export default function ContactsIcon() {
    const { theme: { colors } } = useContext(GlobalContext);
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("contacts")}
            style={{
                position: "absolute",
                right: 20,
                bottom: 20,
                borderRadius: 60,
                witdh: 60,
                height: 60,
                backgroundColor: colors.secondary,
                alignItems: "center",
                justifyContent: "center",
            }}>
            <MaterialCommunityIcons
                name="android-messages"
                size={30}
                color={colors.white}
                style={{
                    transform: [{ scaleX: -1 }]
                }}
            />
        </TouchableOpacity>
    )
}