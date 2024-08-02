import React, { useEffect, useState } from 'react'
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native'
import * as AuthSession from 'expo-auth-session'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Link } from 'expo-router'

// eBayのクライアントIDとシークレット
const CLIENT_ID = 'naofumio-Booker-PRD-f941aca3e-73b0f008'
const CLIENT_SECRET = 'PRD-941aca3e4845-4245-489e-9c06-148b'

// eBayの認証URL
const EBAY_AUTH_URL = 'https://auth.ebay.com/oauth2/authorize'
const EBAY_TOKEN_URL = 'https://api.ebay.com/identity/v1/oauth2/token'

// スコープとリダイレクトURIの設定
const SCOPE = 'https://api.ebay.com/oauth/api_scope'
const REDIRECT_URI = 'naofumi_okamoto-naofumio-Booker-pbbvwax'

// eBayのログアウトURL
// const EBAY_LOGOUT_URL = 'https://signin.ebay.com/ws/eBayISAPI.dll?SignIn'

const EbayLogIn = (): JSX.Element => {
  const [authCode, setAuthCode] = useState<string | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const [authRequest, authResponse, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URI,
      responseType: AuthSession.ResponseType.Code,
      extraParams: {
        scope: SCOPE
      }
    },
    { authorizationEndpoint: EBAY_AUTH_URL }
  )
  useEffect(() => {
    void (async () => {
      console.log('authResponse: ', authResponse)
      if (authResponse?.type === 'success' && authResponse.params.code !== '') {
        const { code } = authResponse.params
        console.log('code', code)
        const partiallyDecodedStr = decodeURIComponent(code)
        const fullyDecodedStr = decodeURIComponent(partiallyDecodedStr)
        setAuthCode(fullyDecodedStr)
        await getAccessToken(fullyDecodedStr)
      }
    })()
  }, [authResponse])

  // アクセストークンの取得
  const getAccessToken = async (code: string): Promise<void> => {
    try {
      const response = await axios.post(
        EBAY_TOKEN_URL,
        new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
          }
        }
      )

      setAccessToken(response.data.access_token)
    } catch (error) {
      console.error('Error fetching access token:', error)
    }
  }
  const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem('ebay_access_token')
    // Optionally, redirect to eBay's logout page if needed
    setAccessToken('')
    // その他のログアウト処理（アプリ内の状態をリセット）
  }

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        {authCode === null
          ? (
            <Button
              disabled={authRequest === null}
              title="Login with eBay"
              onPress={() => { void (async () => { await promptAsync() })() }}
            />
            )
          : (<Text>auth code: {authCode}</Text>)
        }
        {authCode !== null && <Text>Access Token: {accessToken}</Text>}
      </View>
      <View style={styles.item}>
        <Button title="Logout" onPress={() => { void (async () => { await logout() })() }} />
      </View>
      <View style={styles.item}>
        <Link href='/auth/log_in' asChild>
          <Button title="back" />
        </Link>
      </View>
      <Text></Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    marginTop: 100
  }
})

export default EbayLogIn
