import React, { useEffect, useState } from 'react'
import { View, Button, Text, TouchableOpacity } from 'react-native'
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
// const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true })
const REDIRECT_URI = 'naofumi_okamoto-naofumio-Booker-pbbvwax'

// eBayのログアウトURL
const EBAY_LOGOUT_URL = 'https://signin.ebay.com/ws/eBayISAPI.dll?SignIn'

export default function App () {
  const [authCode, setAuthCode] = useState(null)
  const [accessToken, setAccessToken] = useState(null)

  // 認証画面へのリダイレクト
  // const request = new AuthSession.AuthRequest({
  //   clientId: 'naofumio-Booker-PRD-f941aca3e-73b0f008',
  //   clientSecret: 'PRD-941aca3e4845-4245-489e-9c06-148b',
  //   redirectUri: REDIRECT_URI,
  //   // scopes: SCOPE,
  //   responseType: AuthSession.ResponseType.Code,
  //   extraParams: {
  //     scope: SCOPE
  //   }
  // })
  const [authRequest, authResponse, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URI,
      // scopes: [SCOPE],
      responseType: AuthSession.ResponseType.Code,
      extraParams: {
        scope: SCOPE
      }
    },
    { authorizationEndpoint: EBAY_AUTH_URL }
  )
  useEffect(() => {
    console.log('authResponse: ', authResponse)
    if (authResponse?.type === 'success' && authResponse.params.code) {
      const { code } = authResponse.params
      console.log('code', code)
      setAuthCode(code)
      getAccessToken(code)
    }
  }, [authResponse])
  // const authUrl = await request.makeAuthUrlAsync(discovery)
  console.log('redirectUri', REDIRECT_URI)
  // console.log('Auth Requesyt Object:', request)
  // const authUrl = `${EBAY_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`
  // const result = await promptAsync(discovery)
  // console.log('Auth Session Result:', result)

  // if (result.type === 'success' && result.params.code) {
  //   setAuthCode(result.params.code)
  //   getAccessToken(result.params.code)
  // }

  // アクセストークンの取得
  const getAccessToken = async (code) => {
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
  const logout = async () => {
    await AsyncStorage.removeItem('ebay_access_token')
    // Optionally, redirect to eBay's logout page if needed
    setAccessToken(null)
    // その他のログアウト処理（アプリ内の状態をリセット）
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {!authCode
        ? (
        <Button disabled={!authRequest} title="Login with eBay" onPress={async () => await promptAsync()} />
          )
        : (
        <Text>auth code: {authCode}</Text>
          )}
      {authCode && <Text>Access Token: {accessToken}</Text>}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Logout" onPress={async () => await logout()} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Link href='/home' asChild>
          <TouchableOpacity>
            <Text>back</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <Text></Text>
    </View>
  )
}
