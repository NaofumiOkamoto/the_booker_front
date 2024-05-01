import { Stack } from 'expo-router'
import { View, StyleSheet, Text } from 'react-native'
import { auth } from '../../../config'

const Index = (): JSX.Element => {
  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: 'ホーム' }} />
    <View style={styles.container}>
      <Text>{auth.currentUser?.email}でログイン中</Text>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Index
