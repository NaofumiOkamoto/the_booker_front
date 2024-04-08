import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation, router } from 'expo-router'
import { useEffect, useState } from 'react'
import LogOutButton from '../../components/LogOutButton'
import Footer from '../../components/Footer'
import RadioButton from '../../components/RadioButton'

const Platform = (): JSX.Element => {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => { return <LogOutButton /> }
    })
  }, [])

  const handlePress = (): void => {
    router.push('/book/form')
  }
  const [selectedOption, setSelectedOption] = useState<string>('')

  const handleSelectOption = (option: string): void => {
    setSelectedOption(option)
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>新規入札予約</Text>
        <View>

        <RadioButton
          options={['yahoo', 'ebay']}
          selectedOption={selectedOption}
          onSelect={handleSelectOption}
        />
        {selectedOption !== '' &&
          <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Text style={styles.buttonLabel}>次へ</Text>
          </TouchableOpacity>
        }
        </View>
      <Footer />
    </View>
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

export default Platform
