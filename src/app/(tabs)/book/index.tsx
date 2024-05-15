import { View, StyleSheet, Text } from 'react-native'
import { router, Stack } from 'expo-router'
import { useState } from 'react'
import RadioButton from '../../../components/RadioButton'

const Index = (): JSX.Element => {
  // 右上にボタン表示する場合
  // const navigation = useNavigation()
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => { return <LogOutButton /> }
  //   })
  // }, [])

  const [selectedPlatform, setSelectedPlatform] = useState<string>('')

  const handleSelectOption = (option: string): void => {
    setSelectedPlatform(option)
    router.push(
      {
        pathname: '/book/form',
        params: { platform: selectedPlatform }
      }
    )
  }

  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: '新規予約' }} />
    <View style={styles.container}>
      <Text style={styles.title}>予約するサイトを選択してください</Text>
      <View>

      <RadioButton
        options={['ヤフオク', 'ebay']}
        selectedOption={selectedPlatform}
        onSelect={handleSelectOption}
      />
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  main: {
  },
  title: {
    fontSize: 20,
    paddingVertical: 50
  },
  platforms: {
    alignItems: 'flex-start'
  },
  checkArea: {
    flexDirection: 'row' // 縦で割る
  },
  list: {
    fontSize: 25,
    paddingVertical: 27
  },
  next: {
    fontSize: 40
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
  }
})

export default Index
