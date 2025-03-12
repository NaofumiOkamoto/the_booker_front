// import 'react-native-gesture-handler'
// import { Redirect, router } from 'expo-router'
// // import { onAuthStateChanged } from 'firebase/auth'
// // import { auth } from '../config'
// import { useEffect } from 'react'
// import { View } from 'react-native'

// const Index = (): JSX.Element => {
//   useEffect(() => {
//     // onAuthStateChanged(auth, (user) => {
//     //   if (user !== null) {
//     //     router.replace('/(tabs)/home')
//     //   }
//     // })
//   })
//   return <Redirect href='auth/log_in' />
//   // return <Redirect href='auth/sign_up' />
//   // return <Redirect href={'/(tabs)/book'} />
// }

// export default Index

import 'react-native-gesture-handler'
import { Redirect, router } from 'expo-router'
import { useEffect } from 'react'
import { View } from 'react-native'
import AuthProvider, { useAuth } from './auth/AuthProvider'

const Index2 = (): JSX.Element => {
  const { authToken } = useAuth()

  useEffect(() => {
    if (authToken !== null) {
      router.replace('/(tabs)/home')
    }
  }, [authToken])

  if (authToken === null) {
    return <Redirect href='auth/log_in' />
  }

  return <View />
}

const Index = (): JSX.Element => {
  return (
    <AuthProvider>
      <Index2 />
    </AuthProvider>
  );
};
export default Index
