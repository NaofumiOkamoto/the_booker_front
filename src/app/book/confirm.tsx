import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { useNavigation, router } from 'expo-router'
import { useEffect, useState } from 'react'
import LogOutButton from '../../components/LogOutButton'
import Footer from '../../components/Footer'
import Button from '../../components/Button'

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
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>確認</Text>
          <Text>URL</Text>
          <Text>購入したい金額</Text>
          <Text>上限金額(追跡入札用)</Text>
          <Text>残り時間~前で入札</Text>
        <Button label='登録' onPress={handlePress}/>
      </View>
      <Footer />
    </View>
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

export default Form
