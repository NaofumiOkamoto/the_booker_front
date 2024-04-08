import { View, StyleSheet, Text, TextInput } from 'react-native'
import { useNavigation, router, Stack } from 'expo-router'
import { useEffect } from 'react'
import LogOutButton from '../../../components/LogOutButton'
import Button from '../../../components/Button'

const Form = (): JSX.Element => {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => { return <LogOutButton /> }
    })
  }, [])

  const handlePress = (): void => {
    router.push('/book/confirm')
  }

  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: '予約条件入力' }} />
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text>URL</Text>
        <TextInput style={styles.input} value='' />
        <Text>購入したい金額</Text>
        <TextInput style={styles.input} value='' />
        <Text>上限金額(追跡入札用)</Text>
        <TextInput style={styles.input} value='' />
        <Text>残り時間~前で入札</Text>
        <TextInput style={styles.input} value='' />
        <Button label='確認' onPress={handlePress}/>
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
    paddingHorizontal: 27,
    marginTop: 100
  },
  form: {
    flexDirection: 'row' // 縦で割る
  }
})

export default Form
