import { Stack, router } from 'expo-router'
import { View, StyleSheet, Text } from 'react-native'
import Button from '../../../components/Button'

const Confirm = (): JSX.Element => {
  const handlePress = (): void => {
    router.push('/book/confirm')
  }

  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: 'Homeee' }} />
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>確認</Text>
          <Text>URL</Text>
          <Text>購入したい金額</Text>
          <Text>上限金額(追跡入札用)</Text>
          <Text>残り時間~前で入札</Text>
        <Button label='登録' onPress={handlePress}/>
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // alignItems: 'center'
  },
  title: {
    fontSize: 26,
    paddingVertical: 27
  },
  button: {
    backgroundColor: '#467FD3',
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 20
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 24
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    height: 48,
    fontSize: 16,
    padding: 8,
    marginBottom: 16,
    width: '90%'
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27
  },
  form: {
    flexDirection: 'row' // 縦で割る
  }
})

export default Confirm
