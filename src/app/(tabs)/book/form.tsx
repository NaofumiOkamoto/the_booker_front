/* eslint-disable @typescript-eslint/no-misused-promises */
import { View, StyleSheet, Text, TextInput, ActivityIndicator, Button, ScrollView } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import CustomButton from '../../../components/Button'
import { convertNum, convertToCurrency, convertFromCurrency } from '../../lib/function'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const Form = (): JSX.Element => {
  const userPlan: number = 1 // global stateか何かで保持する

  // 入力情報
  const [auctionId, setAuctionId] = useState('')
  const [bidFirstAmount, setBidFirstAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')
  const [selectSeconds, setselectSeconds] = useState('5')

  // バリデーション
  const [validForm, setValidForm] = useState(false)
  const [validAuctionId, setValidAuctionId] = useState(true)
  const [auctionIdInvalidMessage, setAuctionIdInvalidMessage] = useState('')
  const [validBidFirstAmount, setValidBidFirstAmount] = useState(true)
  const [bidFirstAmountInvalidMessage, setBidFirstAmountInvalidMessage] = useState('')
  const [validMaxAmount, setValidMaxAmount] = useState(true)
  const [maxAmountInvalidMessage, setmaxAmountInvalidMessage] = useState('')

  // 取得情報
  const [prodTitle, setProdTitle] = useState('')
  const [prodCurerntPrice, setProdCurerntPrice] = useState('')
  const [prodCurerntPriceNum, setProdCurerntPriceNum] = useState(0)
  const [closeTimeString, setCloseTimeString] = useState('')
  // const [closeTime, setCloseTime] = useState<Date | null>(null)

  const [loding, setLoding] = useState(false)
  const params = useLocalSearchParams()
  const { platform, done } = params

  useEffect(() => {
    let valid = false
    if (userPlan === 0) {
      valid = !loding &&
      !(auctionId === '') && validAuctionId
    } else {
      valid = !loding &&
      !(auctionId === '') && validAuctionId &&
      !(bidFirstAmount === '') && validBidFirstAmount &&
      !(maxAmount === '') && validMaxAmount
    }
    setValidForm(valid)
  }, [validAuctionId, validBidFirstAmount, validMaxAmount, bidFirstAmount, maxAmount])

  // 何秒前
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

  const checkProd = async (): Promise<void> => {
    console.log('check auctionId', auctionId)
    try {
      setValidAuctionId(false)
      setProdTitle('')
      setProdCurerntPrice('')
      setProdCurerntPriceNum(0)
      if (auctionId === '') {
        setAuctionIdInvalidMessage('オークションIDを入力してください')
        return
      }
      if (!/^[a-zA-Z0-9]{8,11}$/.test(auctionId)) {
        setAuctionIdInvalidMessage('オークションIDが正しくありません。オークションIDは英数字の8~11桁です。')
        return
      }
      setLoding(true)
      const res = await axios.get(`http://153.126.213.57:5001/api/check_prod?id=${auctionId}`)
      const success: boolean = res.data.success
      if (success) {
        const title = res.data.title
        const currentPrice = res.data.current_price
        const closeTimeString = res.data.close_time
        const currentPriceNum = convertNum(currentPrice)
        console.log(`${success}: ${title}: ${currentPrice}: ${closeTimeString}`)
        setCloseTimeString(closeTimeString)
        // setCloseTime(convertStringToDate(closeTimeString))
        setProdTitle(title)
        setProdCurerntPrice(currentPrice)
        setProdCurerntPriceNum(currentPriceNum)
        setAuctionIdInvalidMessage('')
      } else {
        setAuctionIdInvalidMessage('商品が存在しません')
      }
      setValidAuctionId(success)
      setLoding(false)
    } catch (e) {
      setLoding(false)
      setValidAuctionId(false)
      setAuctionIdInvalidMessage('商品が存在しません')

      console.log('checkProdでエラー: ', e)
    }
  }

  const checkAmount = (amount: string, setValid: (boolean: boolean) => void, setMessage: (message: string) => void): void => {
    if (auctionId === '') {
      setValid(true)
      return
    }
    const isBidAmountThanCurrent = prodCurerntPriceNum > 0 && prodCurerntPriceNum < convertNum(amount)
    setValid(isBidAmountThanCurrent)
    if (isBidAmountThanCurrent) {
      setMessage('')
    } else {
      setMessage('現在価格より高い金額を入力してください')
    }
  }

  const checkMaxAmount = (): void => {
    if (auctionId === '') {
      setValidMaxAmount(true)
      return
    }

    const isMaxAmountThanBid = convertNum(bidFirstAmount) <= convertNum(maxAmount) && prodCurerntPriceNum < convertNum(maxAmount)
    setValidMaxAmount(isMaxAmountThanBid)
    if (isMaxAmountThanBid) {
      setmaxAmountInvalidMessage('')
    } else {
      setmaxAmountInvalidMessage('現在価格と初回入札金額より高い金額を入力してください')
    }
  }

  const handlePress = (): void => {
    router.push(
      {
        pathname: '/book/confirm',
        params: { auctionId, bidFirstAmount, maxAmount, selectSeconds, prodTitle, closeTimeString, platform }
      }
    )
  }

  const rootNavigation = useNavigation()
  const headerLeft = done as unknown as boolean
    ? {
        headerLeft: () =>
      <Button
        title="新規予約"
        onPress={() => {
          rootNavigation.navigate('index' as never)
        }}
      />
      }
    : {}

  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: '予約条件入力', ...headerLeft }} />
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.platform}>{platform}</Text>
        <View style={styles.inner}>
          <Text style={styles.list_label}>オークションID</Text>
          {auctionIdInvalidMessage !== '' && !loding && (<Text style={styles.invalidMessage}>{auctionIdInvalidMessage}</Text>)}
          <TextInput
            style={validAuctionId || loding ? styles.input : styles.invalidInput}
            value={auctionId}
            keyboardType="web-search"
            onChangeText={auctionId => { setAuctionId(auctionId) }}
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onBlur={async () => { await checkProd() }}
          />
          <View style={styles.productTitle}>
            {
            loding
              ? (<Text>検索中<ActivityIndicator /></Text>)
              : (
                <View>
                  <Text>商品名: {prodTitle}</Text>
                  <Text>現在価格: {prodCurerntPrice}</Text>
                  <Text>終了日時: {closeTimeString}</Text>
                </View>
                )
            }
          </View>
          { userPlan > 0 && // 有料プランの場合
            <>
            <Text style={styles.list_label}>初回入札金額</Text>
            {bidFirstAmountInvalidMessage !== '' && (<Text style={styles.invalidMessage}>{bidFirstAmountInvalidMessage}</Text>)}
            <TextInput
              style={validBidFirstAmount ? styles.input : styles.invalidInput}
              value={bidFirstAmount}
              keyboardType="number-pad"
              onChangeText={input => { setBidFirstAmount(isNaN(Number(input)) ? bidFirstAmount : input) }}
              returnKeyType={'done'}
              onFocus={() => { setBidFirstAmount(convertFromCurrency(bidFirstAmount)) }}
              onBlur={() => {
                checkAmount(bidFirstAmount, setValidBidFirstAmount, setBidFirstAmountInvalidMessage)
                setBidFirstAmount(convertToCurrency(bidFirstAmount))
              }}
            />
            <Text style={styles.list_label}>上限金額</Text>
            {maxAmountInvalidMessage !== '' && (<Text style={styles.invalidMessage}>{maxAmountInvalidMessage}</Text>)}
            <TextInput
              style={validMaxAmount ? styles.input : styles.invalidInput}
              value={maxAmount}
              keyboardType="number-pad"
              onChangeText={input => { setMaxAmount(isNaN(Number(input)) ? maxAmount : input) }}
              returnKeyType={'done'}
              onFocus={() => { setMaxAmount(convertFromCurrency(maxAmount)) }}
              onBlur={() => {
                checkMaxAmount()
                setMaxAmount(convertToCurrency(maxAmount))
              }}
            />
            <Text>※他の入札者がいてもユーザー様が高額入札者になるよう設定した上限金額まで最小単位で自動入札いたします。</Text>
            <Text>※他の入札者が現れて自動延長された後でも、設定した残り秒数まで待って設定した上限金額まで入札を繰り返します。常に残り秒数を確認する手間を省けます。終了ギリギリで入札し続けることによって、他の入札者は終了時間を常に気にしていないといけない状況になる、他の入札者が離脱するなどが考えられるため、落札できる可能性を上げます。</Text>
            </>
          }
          <Text style={styles.list_label}>入札タイミング</Text>
          <RNPickerSelect
            value={selectSeconds}
            onValueChange={(value) => { setselectSeconds(value) }}
            items={secondsItems}
            placeholder={{ label: '秒前', value: '' }}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => (<Text style={{ position: 'absolute', right: 10, top: 8, fontSize: 18, color: '#789' }}>▼</Text>)}
          />
          <CustomButton label='確認' onPress={handlePress} disabled={!validForm}/>
        </View>
      </View>
    </ScrollView>
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
  platform: {
    paddingVertical: 24,
    paddingHorizontal: 27,
    marginTop: 20,
    fontSize: 20
  },
  productTitle: {
    marginBottom: 20
  },
  invalidMessage: {
    color: 'red'
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
  list_label: {
    marginTop: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    height: 48,
    fontSize: 16,
    padding: 8,
    width: '90%'
  },
  disabledInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    height: 48,
    fontSize: 16,
    padding: 8,
    marginBottom: 16,
    width: '90%',
    backgroundColor: '#a9a9a9'
  },
  invalidInput: {
    borderWidth: 1,
    borderColor: 'red',
    height: 48,
    fontSize: 16,
    padding: 8,
    marginBottom: 16,
    width: '90%'
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27,
    marginTop: 10
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
