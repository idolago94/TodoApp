import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
    GoogleSigninButtonProps,
    User
} from '@react-native-google-signin/google-signin';


const Login: React.FC = () => {
    const [userInfo, setUserInfo] = useState<User | null>(null)
    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email'],
            webClientId:
                '405950717468-9t4c5hmosf8ffi87jilfcv04mdgdog6j.apps.googleusercontent.com',
            offlineAccess: true
        });
    }, [])

    const onGoogleLogin = async () => {
        try {
            // await GoogleSignin.hasPlayServices();
            const loginRes = await GoogleSignin.signIn();
            console.log("onGoogleLogin -> userInfo", userInfo)
            setUserInfo(loginRes)
        } catch (error) {
            console.log("onGoogleLogin -> error", error)
        }
    }

    const WelcomeMessage = () => (
        <View style={s.center}>
            <Image style={s.avatar} source={{ uri: userInfo?.user.photo || undefined }} />
            <Text>Welcome {userInfo?.user.name}</Text>
        </View>
    )

    return (
        <SafeAreaView style={s.container}>
            <Text style={s.appName}>TodoApp</Text>
            <View style={[s.mainContent, !userInfo && s.center]}>
                {!userInfo ? <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={onGoogleLogin}
                /> : <WelcomeMessage />}
            </View>
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    appName: {
        fontSize: 40,
        fontWeight: 'bold',
        margin: 16
    },
    mainContent: {
        flex: 1
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 999,
        marginBottom: 5
    }
});

export default Login;