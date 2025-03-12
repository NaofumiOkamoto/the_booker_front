import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { Alert } from 'react-native'
import * as AuthSession from 'expo-auth-session'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

interface AuthContextType {
  authToken: string | null
  authRequest: any
  promptAsync: (options?: AuthSession.AuthRequestPromptOptions) => Promise<AuthSession.AuthSessionResult>
  // loginWithEmail: (email: string, password: string) => void
  logout: () => Promise<void>
  ebayUser: string
}
interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// eBayのクライアントIDとシークレット
// const CLIENT_ID = 'naofumio-Booker-PRD-f941aca3e-73b0f008'
const CLIENT_ID_SAND_BOX = 'naofumio-Booker-SBX-32959e259-dcf1aebc'
// const CLIENT_SECRET = 'PRD-941aca3e4845-4245-489e-9c06-148b'

// eBayの認証URL
// const EBAY_AUTH_URL = 'https://auth.ebay.com/oauth2/authorize'
const EBAY_AUTH_URL_SAND_BOX = 'https://auth.sandbox.ebay.com/oauth2/authorize'

// スコープとリダイレクトURIの設定
// const SCOPE = 'https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/sell.reputation https://api.ebay.com/oauth/api_scope/sell.reputation.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly https://api.ebay.com/oauth/api_scope/sell.stores https://api.ebay.com/oauth/api_scope/sell.stores.readonly'
const SCOPE_SAND_BOX = 'https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/buy.order.readonly https://api.ebay.com/oauth/api_scope/buy.guest.order https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.marketplace.insights.readonly https://api.ebay.com/oauth/api_scope/commerce.catalog.readonly https://api.ebay.com/oauth/api_scope/buy.shopping.cart https://api.ebay.com/oauth/api_scope/buy.offer.auction https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.email.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.phone.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.address.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.name.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.status.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/sell.item.draft https://api.ebay.com/oauth/api_scope/sell.item https://api.ebay.com/oauth/api_scope/sell.reputation https://api.ebay.com/oauth/api_scope/sell.reputation.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly https://api.ebay.com/oauth/api_scope/sell.stores https://api.ebay.com/oauth/api_scope/sell.stores.readonly'

// const REDIRECT_URI = 'naofumi_okamoto-naofumio-Booker-pbbvwax'
const REDIRECT_URI_SAND_BOX = 'naofumi_okamoto-naofumio-Booker-jmcqvyn'

// eBayのログアウトURL
// const EBAY_LOGOUT_URL = 'https://signin.ebay.com/ws/eBayISAPI.dll?SignIn'

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  // const [authCode, setAuthCode] = useState<string | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(null)
  // const [isLoading, setIsLoading] = useState(true)
  // const [accessToken, setAccessToken] = useState<string | null>(null)
  const [ebayUser, serEbayUser] = useState<string>('')

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
      clientId: CLIENT_ID_SAND_BOX,
      redirectUri: REDIRECT_URI_SAND_BOX,
      responseType: AuthSession.ResponseType.Code,
      extraParams: {
        scope: SCOPE_SAND_BOX,
        // prompt: 'login' // ここを指定すると毎回ebayのログイン画面が表示される
      }
    },
    { authorizationEndpoint: EBAY_AUTH_URL_SAND_BOX }
  )

  useEffect(() => {
    void (async () => {
      const initializeAuth = async (): Promise<void> => {
        const token = await getToken()
        if (token !== null) {
          setAuthToken(token)
        }
        // setIsLoading(false)
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
        // setAuthCode(fullyDecodedStr)
        // await getAccessToken(fullyDecodedStr)
        await authenticateWithBookerServer(fullyDecodedStr)
      }
    })()
  }, [authResponse])

  // bookerサーバーからログイントークンを取得
  const authenticateWithBookerServer = async (fullyDecodedStr: string): Promise<void> => {
    // const url = `http://${process.env.EXPO_PUBLIC_API_DOMAIN}:5001/api/authenticate`
    const url = 'https://camping-door.com/api/authenticate'
    console.log('bbokerサーバーへ!!', url)
    console.log('fullyDecodedStr!!', fullyDecodedStr)
    try {
      const response = await axios.post(
        url,
        { fullyDecodedStr },
        { headers: { 'Content-Type': 'application/json' }}
      )
      const bookerToken = response.data.token
      const user = response.data.ebay_user
      console.log('bookerToken', bookerToken)
      setAuthToken(bookerToken)
      await storeToken(bookerToken)
      serEbayUser(user.username)
      // router.replace('/home')
    } catch (error) {
      console.log(error)
      Alert.alert('認証エラー', '認証に失敗しました。')
    }
  }

  const logout = async (): Promise<void> => {
    setAuthToken(null)
    // eBayのログアウトURLにリダイレクト
    await removeToken()
    // router.replace('/auth/ebay_login')
  }
  // if (isLoading) {
  //   return <></>
  // }

  return (
    <AuthContext.Provider value={{ authToken, authRequest, promptAsync, logout, ebayUser }}>
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
  //   </View>
  // )
}

export default AuthProvider
