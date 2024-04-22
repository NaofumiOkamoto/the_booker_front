import { Link, Stack } from 'expo-router'
import { View, StyleSheet, Text } from 'react-native'

const Index = (): JSX.Element => {
  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: 'メニュー' }} />
    <View style={styles.container}>
      <Link href='/menu/terms_of_service'>
        <Text>利用規約</Text>
      </ Link>
      <Link href='/menu/privacy_policy'>
        <Text>プライバシーポリシー</Text>
      </ Link>
      <Link href='/menu/manual'>
        <Text>使い方</Text>
      </ Link>
      <Link href='/menu/contact'>
        <Text>問い合わせ</Text>
      </ Link>
      <Link href='/auth/log_in'>
        <Text>ログアウト</Text>
      </ Link>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 100,
    marginBottom: 100
  }
})

export default Index
