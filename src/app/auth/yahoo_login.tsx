import React from 'react'
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { auth } from '../../config'
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'
import { OAuthProvider, signInWithCredential } from 'firebase/auth'
import LogOutButton from '../../components/LogOutButton'
import { Link } from 'expo-router'

// 完了している可能性のある認証セッションを処理
WebBrowser.maybeCompleteAuthSession()

// AuthSession.makeRedirectUri({
//   native: 'https://the-booker-74a7a.firebaseapp.com/__/auth/handler',
// });
const redirectUri = 'https://the-booker-74a7a.firebaseapp.com/__/auth/handler'
// const redirectUri = 'https://expo.dev/preview/update?projectId=1567ff5d-c6a5-4f7e-a20f-1eddab70eef4&group=4b0317cd-b5d3-4526-9d0e-b884e7aac190'
console.log('&&&&&&&&&&', redirectUri)

const discovery = {
  authorizationEndpoint: 'https://auth.login.yahoo.co.jp/yconnect/v2/authorization',
  tokenEndpoint: 'https://auth.login.yahoo.co.jp/yconnect/v2/token',
}

const AuthScreen: React.FC = () => {
  const handleYahooLogin = async () => {
    try {
      const request = new AuthSession.AuthRequest({
        clientId: process.env.EXPO_PUBLIC_FB_YAHOO_CLIENT_ID,
        clientSecret: process.env.EXPO_PUBLIC_FB_YAHOO_CLIENT_SECRET,
        redirectUri,
        scopes: ['openid', 'profile', 'email'],
        responseType: AuthSession.ResponseType.Code,
        // extraParams: {
        //   client_secret: process.env.EXPO_PUBLIC_FB_YAHOO_CLIENT_SECRET!,
        // },
      })

      // requestオブジェクトの内容をログに出力

      const authUrl = await request.makeAuthUrlAsync(discovery)
      console.log('redirectUri', redirectUri)
      console.log('Auth Requesyt Object:', request)

      const result = await request.promptAsync(discovery)
      console.log('Auth Session Result:', result)

      if (result.type === 'success' && result.params.code) {
        console.log('00000000')
        const tokenResponse = await fetch(discovery.tokenEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            client_id: process.env.EXPO_PUBLIC_FB_YAHOO_CLIENT_ID!,
            client_secret: process.env.EXPO_PUBLIC_FB_YAHOO_CLIENT_SECRET!,
            code: result.params.code,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
          }).toString()
        })
        console.log('1111111')

        const tokenResult = await tokenResponse.json()
        console.log('Token Result:', tokenResult)

        if (tokenResult.access_token) {
          const yahooProvider = new OAuthProvider('yahoo.com')
          const credential = yahooProvider.credential({
            idToken: tokenResult.id_token,
            accessToken: tokenResult.access_token
          })
          await signInWithCredential(auth, credential)
          console.log('User logged in')
        }
      }
    } catch (error) {
      console.error('Yahoo Login Error: ', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yahoo Login</Text>
      <Button title="Login with Yahoo" onPress={handleYahooLogin} />
      <View style={styles.etc_login}>
        <Link href='/auth/log_in' asChild>
          <TouchableOpacity>
            <Text style={styles.footerLink}>emailを使用してログイン</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View style={styles.etc_login}>
        <Link href='/auth/google_login' asChild>
          <TouchableOpacity>
            <Text style={styles.footerLink}>googleを使用してログイン</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  etc_login: {
    marginTop: 50
  }
})

export default AuthScreen
