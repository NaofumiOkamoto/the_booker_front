import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { auth } from '../../config';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

// 完了している可能性のある認証セッションを処理
WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};
console.log('EXPO_PUBLIC_GOOGLE_CLIENT_SECRET:', process.env.EXPO_PUBLIC_GOOGLE_CLIENT_SECRET);

const AuthScreenGoogle: React.FC = () => {
  const handleGoogleLogin = async () => {
    try {
      // const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
      const redirectUri = 'https://the-booker-74a7a.firebaseapp.com/__/auth/handler'
      // const redirectUri = 'https://auth.expo.io/@naofumiokamoto/TheBooker'

      console.log('gooooooogle', process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID)
      const request = new AuthSession.AuthRequest({
        clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!,
        // clientSecret: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_SECRET!,
        redirectUri,
        scopes: ['openid', 'profile', 'email'],
        responseType: AuthSession.ResponseType.Code,
        extraParams: {
          clientSecret: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_SECRET!,
        },
      });

      const authUrl = await request.makeAuthUrlAsync(discovery)
      const result = await request.promptAsync(discovery);
      console.log('google Auth Session Result:', result);

      if (result.type === 'success' && result.params.code) {
        const tokenResponse = await fetch(discovery.tokenEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!,
            client_secret: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_SECRET!,
            code: result.params.code,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code',
          }).toString(),
        });

        const tokenResult = await tokenResponse.json();
        console.log('Token Result:', tokenResult);

        if (tokenResult.access_token) {
          const googleProvider = new GoogleAuthProvider();
          const credential = GoogleAuthProvider.credential(tokenResult.id_token, tokenResult.access_token);
          await signInWithCredential(auth, credential);
          console.log('User logged in');
        }
      }
    } catch (error) {
      console.error('Google Login Error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Login</Text>
      <Button title="Login with Google" onPress={handleGoogleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default AuthScreenGoogle;
