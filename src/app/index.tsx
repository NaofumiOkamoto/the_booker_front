import 'react-native-gesture-handler'
import { Redirect, router } from 'expo-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config'
import { useEffect } from 'react'

const Index = (): JSX.Element => {
  useEffect(() => {
    // onAuthStateChanged(auth, (user) => {
    //   if (user !== null) {
    //     router.replace('/(tabs)/home')
    //   }
    // })
  })
  // return <Redirect href='auth/log_in' />
  // return <Redirect href='auth/sign_up' />
  return <Redirect href={'/(tabs)/book'} />
}

export default Index
