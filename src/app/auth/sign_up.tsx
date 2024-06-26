import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Link, router } from 'expo-router'
import CustomButton from '../../components/Button'
import { useState } from 'react'
import { auth } from '../../config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { authError } from '../lib/function'

const handlePress = (email: string, password: string): void => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('userCredential: ', userCredential)
      router.replace('/(tabs)/home')
    })
    .catch((error) => {
      const { code, message } = error
      console.log(code, message)
      Alert.alert(authError(code))
    })
}

const SignUp = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Sign Up</Text>
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
        <CustomButton label='登録' onPress={ () => { handlePress(email, password) }}/>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registerd</Text>
          <Link href='/auth/log_in' asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Log in</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
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
    flexDirection: 'row'
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

export default SignUp
