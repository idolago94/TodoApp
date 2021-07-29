import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { GoogleSignin, GoogleSigninButton, User } from '@react-native-google-signin/google-signin';
import Main from './Main';

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
            const loginRes = await GoogleSignin.signIn();
            console.log("onGoogleLogin -> userInfo", loginRes)
            setUserInfo(loginRes)
        } catch (error) {
            console.log("onGoogleLogin -> error", error)
        }
    }

    return (
        <SafeAreaView style={s.container}>
            {userInfo ? <Main user={userInfo} /> : <View style={s.center}>
                <Text style={s.appName}>TodoApp</Text>
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={onGoogleLogin}
                />
            </View>}
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    appName: {
        fontSize: 40,
        fontWeight: 'bold',
        margin: 16
    }
});

export default Login;