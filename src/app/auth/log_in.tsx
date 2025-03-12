import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { Link, router } from 'expo-router'
import CustomButton from '../../components/Button'
// import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
// import { auth } from '../../config'
// import { authError } from '../lib/function'
import EbayLogIn2 from './eaby_login2'
import AuthProvider from '../auth/AuthProvider'

const handlePress = (email: string, password: string): void => {
  console.log(email)
  console.log(password)
  router.replace('/(tabs)/home')
  // signInWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     console.log(userCredential.user.uid)
  //     router.replace('/(tabs)/home')
  //   })
  //   .catch((error) => {
  //     const { code, message } = error
  //     console.log(code, message)
  //     Alert.alert(authError(code))
  //   })
}

const LogIn = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <AuthProvider>
    <View style={styles.container}>

      <View style={styles.inner}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => { setEmail(text) }}
          keyboardType='email-address'
          autoCapitalize='none'
          textContentType='emailAddress'
          placeholder='email'
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => { setPassword(text) }}
          secureTextEntry
          autoCapitalize='none'
          placeholder='password'
        />
        <CustomButton label='ログイン' onPress={ () => { handlePress(email, password) }}/>
        <View style={styles.footer}>
          {/* <Text style={styles.footerText}>not registerd</Text>
          <View>
            <Link href='/auth/sign_up' asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Sign up here</Text>
              </TouchableOpacity>
            </Link>
          </View> */}
        </View>
        <View>
          {/* <Link href='/auth/yahoo_login' asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>yahooを使用してログイン</Text>
            </TouchableOpacity>
          </Link> */}
          {/* <Link href='/auth/ebay_login' asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>ebayを使用してログイン</Text>
            </TouchableOpacity>
          </Link> */}
          <EbayLogIn2 />
        </View>
      </View>
    </View>
    </AuthProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8'
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    height: 48,
    fontSize: 16,
    padding: 8,
    marginBottom: 16
  },
  footer: {
    flexDirection: 'row',
    marginBottom: 50
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
    color: '#000'
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#467FD3'
  }
})

export default LogIn
