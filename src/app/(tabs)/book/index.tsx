import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation, router, Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import LogOutButton from '../../../components/LogOutButton'
import RadioButton from '../../../components/RadioButton'

const Index = (): JSX.Element => {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => { return <LogOutButton /> }
    })
  }, [])

  const handlePress = (): void => {
    router.push(
      {
        pathname: '/book/form',
        params: { platform: selectedPlatform }
      }
    )
  }
  const [selectedPlatform, setSelectedPlatform] = useState<string>('')

  const handleSelectOption = (option: string): void => {
    setSelectedPlatform(option)
  }

  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: '新規予約' }} />
    <View style={styles.container}>
      <Text style={styles.title}>サイト選択</Text>
      <View>

      <RadioButton
        options={['ヤフオク', 'ebay']}
        selectedOption={selectedPlatform}
        onSelect={handleSelectOption}
      />
      {selectedPlatform !== '' &&
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonLabel}>次へ</Text>
        </TouchableOpacity>
      }
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
    fontSize: 26,
    paddingVertical: 27
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
