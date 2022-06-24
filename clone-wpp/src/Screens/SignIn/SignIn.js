import { View, Text, Image, TextInput, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import Context from "../../Context/Context";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SignInAuth, SignUp } from '../../Auth/Auth';

export default function SignIn() {
    const { theme: { colors } } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("Registrar");

    const AlterMode = () => {
        mode == "Registrar" ? setMode("Entrar") : setMode("Registrar");
        mode == "Entrar" ? setMode("Registrar") : setMode("Entrar");
    }

    const Auth = () => {
        if(mode == "Registrar")
            SignUp(email, password);
        if(mode == "Entrar")
            SignInAuth(email, password)
    }

    return (
        <View style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            backgroundColor: colors.white
        }}>
            <Text
                style={{
                    color: colors.foreground,
                    fontSize: 24,
                    marginBottom: 20
                }}
            >
                Bem Vindo ao WhatsApp!
            </Text>
            <Image
                source={require("../../../assets/welcome-img.png")}
                style={{
                    width: 180,
                    height: 180
                }}
                resizeMode="cover"
            />
            <View style={{ marginTop: 20 }}>
                <TextInput placeholder='Email' onChangeText={setEmail} value={email}
                    style={{
                        borderBottomColor: colors.primary,
                        borderBottomWidth: 2,
                        width: 220,
                        marginTop: 20,
                    }} />
                <TextInput placeholder='Senha' onChangeText={setPassword} secureTextEntry value={password}
                    style={{
                        borderBottomColor: colors.primary,
                        borderBottomWidth: 2,
                        width: 220,
                        marginTop: 20,
                    }} />
                <View style={{ marginTop: 20 }}>
                    <Button
                        title={mode}
                        color={colors.secondary}
                        disabled={!password || !email}
                        onPress={Auth}
                    />
                </View>
                <TouchableOpacity style={{ marginTop: 20 }} onPress={AlterMode}>
                    <Text style={{
                        color: colors.secondaryText
                    }}
                    >{mode == "Registrar" ? "Já tem uma conta? Faça Login!" : "Não tem uma conta? Registre-se!"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}