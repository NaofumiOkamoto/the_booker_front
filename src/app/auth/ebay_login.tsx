import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { View, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import * as AuthSession from 'expo-auth-session'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Link, router } from 'expo-router'

interface AuthContextType {
  authToken: string | null
  promptAsync: (options?: AuthSession.AuthRequestPromptOptions) => Promise<AuthSession.AuthSessionResult>
  // loginWithEmail: (email: string, password: string) => void
  logout: () => Promise<void>
}
interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => useContext(AuthContext);
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext)
//   console.log('-----', context)
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }

// eBayのクライアントIDとシークレット
const CLIENT_ID = 'naofumio-Booker-PRD-f941aca3e-73b0f008'
// const CLIENT_SECRET = 'PRD-941aca3e4845-4245-489e-9c06-148b'

// eBayの認証URL
const EBAY_AUTH_URL = 'https://auth.ebay.com/oauth2/authorize'
// const EBAY_TOKEN_URL = 'https://api.ebay.com/identity/v1/oauth2/token'

// スコープとリダイレクトURIの設定
const SCOPE = 'https://api.ebay.com/oauth/api_scope'
const REDIRECT_URI = 'naofumi_okamoto-naofumio-Booker-pbbvwax'

// eBayのログアウトURL
// const EBAY_LOGOUT_URL = 'https://signin.ebay.com/ws/eBayISAPI.dll?SignIn'

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [authCode, setAuthCode] = useState<string | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  // const [accessToken, setAccessToken] = useState<string | null>(null)

  const storeToken = async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem('authToken', token)
    } catch (e) {
      console.error('Failed to save token.', e)
    }
  }

  const getToken = async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem('authToken')
    } catch (e) {
      console.error('Failed to fetch token.', e)
      return null
    }
  }

  const removeToken = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('authToken')
    } catch (e) {
      console.error('Failed to remove token.', e)
    }
  }

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
      const initializeAuth = async (): Promise<void> => {
        const token = await getToken()
        if (token !== null) {
          setAuthToken(token)
        }
        setIsLoading(false)
      }

      await initializeAuth()
    })
  }, [])

  useEffect(() => {
    void (async () => {
      console.log('authResponse: ', authResponse)
      if (authResponse?.type === 'success' && authResponse.params.code !== '') {
        const { code } = authResponse.params
        console.log('code', code)
        const partiallyDecodedStr = decodeURIComponent(code)
        const fullyDecodedStr = decodeURIComponent(partiallyDecodedStr)
        setAuthCode(fullyDecodedStr)
        // await getAccessToken(fullyDecodedStr)
        await authenticateWithBookerServer(code)
      }
    })()
  }, [authResponse])

  // bookerサーバーからログイントークンを取得
  const authenticateWithBookerServer = async (code: string): Promise<void> => {
    try {
      const response = await axios.post(`http://${EXPO_PUBLIC_API_DOMAIN}:5001/api/authenticate`, { code })
      const token = response.data.token
      setAuthToken(token)
      await storeToken(token)
      router.replace('/home')
    } catch (error) {
      Alert.alert('認証エラー', '認証に失敗しました。');
    }
  }
  // アクセストークンの取得
  // const getAccessToken = async (code: string): Promise<void> => {
  //   try {
  //     const response = await axios.post(
  //       EBAY_TOKEN_URL,
  //       new URLSearchParams({
  //         grant_type: 'authorization_code',
  //         code,
  //         redirect_uri: REDIRECT_URI
  //       }),
  //       {
  //         headers: {
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //           Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
  //         }
  //       }
  //     )

  //     setAccessToken(response.data.access_token)
  //   } catch (error) {
  //     console.error('Error fetching access token:', error)
  //   }
  // }
  const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem('ebay_access_token')
    setAuthToken(null)
    await removeToken()
    router.replace('/auth/ebay_login')
  }
  // if (isLoading) {
  //   return <></>
  // }

  return (
    <AuthContext.Provider value={{ authToken, promptAsync, logout }}>
      {children}
    </AuthContext.Provider>
  )
  // return (
  //   <View style={styles.container}>
  //     <View style={styles.item}>
  //       {authCode === null
  //         ? (
  //           <Button
  //             disabled={authRequest === null}
  //             title="Login with eBay"
  //             onPress={() => { void (async () => { await promptAsync() })() }}
  //           />
  //           )
  //         : (<Text>auth code: {authCode}</Text>)
  //       }
  //       {/* {authCode !== null && <Text>Access Token: {accessToken}</Text>} */}
  //     </View>
  //     <View style={styles.item}>
  //       <Button title="Logout" onPress={() => { void (async () => { await logout() })() }} />
  //     </View>
  //     <View style={styles.item}>
  //       <Link href='/auth/log_in' asChild>
  //         <Button title="back" />
  //       </Link>
  //     </View>
  //     <Text></Text>
  //   </View>
  // )
}
const LogOutButton = (): JSX.Element => {
  // const { logout } = useAuth()

  // return (
  //   <TouchableOpacity onPress={logout}>
  //     <Text>ログアウト</Text>
  //   </TouchableOpacity>
  // )
}

const EbayLogIn = (): JSX.Element => {
  const { promptAsync } = useAuth()

  return (
    <View style={styles.container}>
      <Text>aaa</Text>
      <AuthProvider>
        <LogOutButton />
        <TouchableOpacity onPress={() => { void (async () => { await promptAsync() })() }}>
          <Text>eBayでログイン</Text>
        </TouchableOpacity>
      </AuthProvider>
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
