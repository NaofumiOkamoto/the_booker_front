import { View, StyleSheet, Text, TextInput } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { useNavigation, router, Stack } from 'expo-router'
import { useEffect, useState } from 'react'
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
    router.push({ pathname: '/book/confirm', params: { } })
  }

  const [id, setId] = useState('')
  const [bidAmount, setBidAmount] = useState('')
  const [bitFirstAmount, setFirstAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')
  const [selectMinute, setSelectMinute] = useState('1')

  // 通貨に戻す
  const convertToCurrency = (num: string): string => {
    return '¥' + num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  }

  // 通貨から戻す
  const convertFromCurrency = (num: string): string => {
    let temp = num.replace('¥', '')
    temp = temp.replace(',', '')
    temp = temp.replace(' ', '')
    return temp
  }
  const secondsItems = []
  for (let i = 5; i < 60 + 1; i++) {
    if (i % 5 === 0) {
      const hour = String(i)
      secondsItems.push({
        label: hour + ' 秒前',
        value: hour
      })
    }
  }

  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: '予約条件入力' }} />
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text>オークションID</Text>
        <TextInput
          style={styles.input}
          value={id}
          keyboardType="web-search"
          onChangeText={id => { setId(id) }}
        />
        { true && // 無料プランの場合
          <>
          <Text>入札金額</Text>
          <TextInput
            style={styles.input}
            value={bidAmount}
            keyboardType="number-pad"
            onChangeText={input => { setBidAmount(isNaN(Number(input)) ? bidAmount : input) }}
            returnKeyType={'done'}
            onFocus={() => { setBidAmount(convertFromCurrency(bidAmount)) }}
            onBlur={() => { if (bidAmount !== '') setBidAmount(convertToCurrency(bidAmount)) }}
          />
          </>
        }
        { true && // 有料プランの場合
          <>
          <Text>初回入札金額</Text>
          <TextInput
            style={styles.input}
            value={bitFirstAmount}
            keyboardType="number-pad"
            onChangeText={input => { setFirstAmount(isNaN(Number(input)) ? bitFirstAmount : input) }}
            returnKeyType={'done'}
            onFocus={() => { setFirstAmount(convertFromCurrency(bitFirstAmount)) }}
            onBlur={() => { if (bitFirstAmount !== '') setFirstAmount(convertToCurrency(bitFirstAmount)) }}
          />
          <Text>上限金額</Text>
          <TextInput
            style={styles.input}
            value={maxAmount}
            keyboardType="number-pad"
            onChangeText={input => { setMaxAmount(isNaN(Number(input)) ? maxAmount : input) }}
            returnKeyType={'done'}
            onFocus={() => { setMaxAmount(convertFromCurrency(maxAmount)) }}
            onBlur={() => { if (maxAmount !== '') setMaxAmount(convertToCurrency(maxAmount)) }}
          />
          </>
        }
        <Text>入札タイミング</Text>
        <RNPickerSelect
          value={selectMinute}
          onValueChange={(value) => { setSelectMinute(value) }}
          items={secondsItems}
          placeholder={{ label: '秒前', value: '' }}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          Icon={() => (<Text style={{ position: 'absolute', right: 10, top: 8, fontSize: 18, color: '#789' }}>▼</Text>)}
        />
        <Button label='確認' onPress={handlePress} />
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    color: '#789',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 30,
    width: '90%'
  },
  inputAndroid: {
    fontSize: 30,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0,
    borderColor: '#789',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 130,
    marginLeft: 30
  }
})

export default Form
