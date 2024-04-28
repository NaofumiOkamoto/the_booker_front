/* eslint-disable @typescript-eslint/no-misused-promises */
import { View, StyleSheet, Text, TextInput, ActivityIndicator } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import Button from '../../../components/Button'
import { convertNum, convertToCurrency, convertFromCurrency, convertStringToDate } from '../../lib/function'
import axios from 'axios'

const Form = (): JSX.Element => {
  const userPlan: number = 1 // global stateか何かで保持する

  // 入力情報
  const [auctionId, setAuctionId] = useState('')
  const [bidAmount, setBidAmount] = useState('')
  const [bidFirstAmount, setBidFirstAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')
  const [selectSeconds, setselectSeconds] = useState('5')

  // バリデーション
  const [validForm, setValidForm] = useState(false)
  const [validAuctionId, setValidAuctionId] = useState(true)
  const [auctionIdInvalidMessage, setAuctionIdInvalidMessage] = useState('')
  const [validBidAmount, setValidBidAmount] = useState(true)
  const [bidAmountInvalidMessage, setBidAmountInvalidMessage] = useState('')
  const [validBidFirstAmount, setValidBidFirstAmount] = useState(true)
  const [bidFirstAmountInvalidMessage, setBidFirstAmountInvalidMessage] = useState('')
  const [validMaxAmount, setValidMaxAmount] = useState(true)
  const [maxAmountInvalidMessage, setmaxAmountInvalidMessage] = useState('')

  // 取得情報
  const [prodTitle, setProdTitle] = useState('')
  const [prodCurerntPrice, setProdCurerntPrice] = useState('')
  const [prodCurerntPriceNum, setProdCurerntPriceNum] = useState(0)
  const [closeTimeString, setCloseTimeString] = useState('')
  const [closeTime, setCloseTime] = useState<Date | null>(null)

  const [loding, setLoding] = useState(false)
  const params = useLocalSearchParams()
  const { platform } = params

  useEffect(() => {
    let valid = false
    if (userPlan === 0) {
      valid = !loding &&
      !(auctionId === '') && validAuctionId &&
      !(bidAmount === '') && validBidAmount
    } else {
      valid = !loding &&
      !(auctionId === '') && validAuctionId &&
      !(bidFirstAmount === '') && validBidFirstAmount &&
      !(maxAmount === '') && validMaxAmount
    }
    console.log(`${validAuctionId}, ${validBidAmount},${validBidFirstAmount},${validMaxAmount}`)
    setValidForm(valid)
  }, [validAuctionId, validBidAmount, validBidFirstAmount, validMaxAmount, bidAmount, bidFirstAmount, maxAmount])

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
      const res = await axios.get(`http://localhost:5001/api/check_prod?id=${auctionId}`)
      const success: boolean = res.data.success
      if (success) {
        const title = res.data.title
        const currentPrice = res.data.current_price
        const closeTimeString = res.data.close_time
        const currentPriceNum = convertNum(currentPrice)
        console.log(`${success}: ${title}: ${currentPrice}: ${closeTimeString}`)
        setCloseTimeString(closeTimeString)
        setCloseTime(convertStringToDate(closeTimeString))
        setProdTitle(title)
        setProdCurerntPrice(currentPrice)
        setProdCurerntPriceNum(currentPriceNum)
        setAuctionIdInvalidMessage('')
        if (bidAmount !== '') {
          setValidBidAmount(currentPriceNum < convertNum(bidAmount))
        }
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
        params: { auctionId, bidAmount, bidFirstAmount, maxAmount, selectSeconds, prodTitle, closeTime }
      }
    )
  }

  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: '予約条件入力' }} />
    <View style={styles.container}>
      <Text style={styles.platform}>{platform}</Text>
      <View style={styles.inner}>
        <Text>オークションID</Text>
        {auctionIdInvalidMessage !== '' && (<Text style={styles.invalidMessage}>{auctionIdInvalidMessage}</Text>)}
        <TextInput
          style={validAuctionId ? styles.input : styles.invalidInput}
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
        { userPlan === 0 && // 無料プランの場合
          <>
          <Text>入札金額</Text>
          {bidAmountInvalidMessage !== '' && (<Text style={styles.invalidMessage}>{bidAmountInvalidMessage}</Text>)}
          <TextInput
            style={validBidAmount ? styles.input : styles.invalidInput}
            value={bidAmount}
            keyboardType="number-pad"
            returnKeyType={'done'}
            onChangeText={input => { setBidAmount(isNaN(Number(input)) ? bidAmount : input) }}
            onFocus={() => { setBidAmount(convertFromCurrency(bidAmount)) }}
            onBlur={() => {
              checkAmount(bidAmount, setValidBidAmount, setBidAmountInvalidMessage)
              setBidAmount(convertToCurrency(bidAmount))
            }}
          />
          </>
        }
        { userPlan > 0 && // 有料プランの場合
          <>
          <Text>初回入札金額</Text>
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
          <Text>上限金額</Text>
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
          </>
        }
        <Text>入札タイミング</Text>
        <RNPickerSelect
          value={selectSeconds}
          onValueChange={(value) => { setselectSeconds(value) }}
          items={secondsItems}
          placeholder={{ label: '秒前', value: '' }}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          Icon={() => (<Text style={{ position: 'absolute', right: 10, top: 8, fontSize: 18, color: '#789' }}>▼</Text>)}
        />
        <Button label='確認' onPress={handlePress} disabled={!validForm}/>
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
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    height: 48,
    fontSize: 16,
    padding: 8,
    marginBottom: 16,
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
