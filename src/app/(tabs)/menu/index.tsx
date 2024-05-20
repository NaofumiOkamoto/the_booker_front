import { Stack, router, useLocalSearchParams } from 'expo-router'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import LogOutButton from '../../../components/LogOutButton'

const Index = (): JSX.Element => {
  const params = useLocalSearchParams()
  const { from } = params
  if (from === 'Home') {
    router.push(
      {
        pathname: '/menu/book_history'
      }
    )
  }

  const handlePress = (path: string): void => {
    router.push(
      {
        pathname: `/menu/${path}`
      }
    )
  }
  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: 'メニュー' }} />
    <View style={styles.container}>
      <TouchableOpacity style={styles.list_item} onPress={ () => { handlePress('book_history') }}>
        <Text style={styles.list_item_text}>予約履歴</Text>
      </ TouchableOpacity>
      <TouchableOpacity style={styles.list_item} onPress={ () => { handlePress('buy_history') }}>
        <Text style={styles.list_item_text}>購入履歴</Text>
      </ TouchableOpacity>
      <TouchableOpacity style={styles.list_item} onPress={ () => { handlePress('usage_situation') }}>
        <Text style={styles.list_item_text}>ご利用状況</Text>
      </ TouchableOpacity>
      <TouchableOpacity style={styles.list_item} onPress={ () => { handlePress('privacy_policy') }}>
        <Text style={styles.list_item_text}>プライバシーポリシー</Text>
      </ TouchableOpacity>
      <TouchableOpacity style={styles.list_item} onPress={ () => { handlePress('terms_of_service') }}>
        <Text style={styles.list_item_text}>利用規約</Text>
      </ TouchableOpacity>
      <TouchableOpacity style={styles.list_item} onPress={ () => { handlePress('user_info') }}>
        <Text style={styles.list_item_text}>ユーザー情報</Text>
      </ TouchableOpacity>
      <TouchableOpacity style={styles.list_item} onPress={ () => { handlePress('plan') }}>
        <Text style={styles.list_item_text}>プラン</Text>
      </ TouchableOpacity>
      <TouchableOpacity style={styles.list_item} onPress={ () => { handlePress('yahoo_id') }}>
        <Text style={styles.list_item_text}>Yahoo Id </Text>
      </ TouchableOpacity>
      <TouchableOpacity style={styles.list_item} onPress={ () => { handlePress('manual') }}>
        <Text style={styles.list_item_text}>使い方</Text>
      </ TouchableOpacity>
      <TouchableOpacity style={styles.list_item} onPress={ () => { handlePress('contact') }}>
        <Text style={styles.list_item_text}>問い合わせ</Text>
      </ TouchableOpacity>
      <LogOutButton />
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 100
  },
  link: {
    width: '100%'
  },
  list_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.15)'
  },
  list_item_text: {
    fontSize: 16,
    lineHeight: 25,
    paddingLeft: 20
  }
})

export default Index
