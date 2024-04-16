import { Link, Stack } from 'expo-router'
import { View, StyleSheet, Text } from 'react-native'

const Index = (): JSX.Element => {
  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: 'マイページ' }} />
    <View style={styles.container}>
      <Text>ユーザー情報</Text>
      <Text>プラン</Text>
      <Link href='/mypage/yahoo_id'>
        <Text> Yahoo Id </Text>
      </ Link>
      <Text>予約一覧</Text>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 100
  }
})

export default Index
