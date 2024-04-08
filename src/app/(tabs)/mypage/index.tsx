import { Stack } from 'expo-router'
import { View, StyleSheet, Text } from 'react-native'

const Index = (): JSX.Element => {
  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: 'マイページ' }} />
    <View style={styles.container}>
      <Text>マイページ</Text>
      <Text></Text>
      <Text>ユーザー情報</Text>
      <Text>Yahoo Id</Text>
      <Text>予約一覧</Text>
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
