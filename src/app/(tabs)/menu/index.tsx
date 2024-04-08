import { Stack } from 'expo-router'
import { View, StyleSheet, Text } from 'react-native'

const Index = (): JSX.Element => {
  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: 'メニュー' }} />
    <View style={styles.container}>
      <Text></Text>
      <Text>・利用規約</Text>
      <Text>・プライバシーポリシー</Text>
      <Text>・使い方</Text>
      <Text>・問い合わせ</Text>
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
