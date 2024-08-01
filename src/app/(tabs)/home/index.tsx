import { Stack, router } from 'expo-router'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
// import { auth } from '../../../config'
// import PieChart from '../../../components/PieChart'
// import Accordion from '../../../components/Accordion'
// import Manual from '../../../components/Manual'
// import PriceList from '../../../components/PriceList'
// import axios from 'axios'
// import { useCallback } from 'react'
// import { type Book } from '../menu/book_history'
// import { useFocusEffect } from '@react-navigation/native'

// console.log(process.env.EXPO_PUBLIC_API_DOMAIN)
const Index = (): JSX.Element => {
  // const [yahoo, setYahoo] = useState([])
  // const [ebay, setEbay] = useState([])
  // useEffect(() => {
  //   void (async (): Promise<void> => {
  //     try {
  //       const res = await axios.get(`http://EXPO_PUBLIC_API_DOMAIN:5001/book?user_id=${auth.currentUser?.uid}`)
  //       const yahoo = res.data.books.filter((b: Book) => b.platform_name === 'ヤフオク')
  //       const ebay = res.data.books.filter((b: Book) => b.platform_name === 'ebay')
  //       setYahoo(yahoo)
  //       setEbay(ebay)
  //     } catch (e) {
  //       console.log('予約履歴取得時エラー: ', e)
  //     }
  //   })()
  // }, [])
  // useFocusEffect(
  //   useCallback(() => {
  //     const fetchData = async (): Promise<void> => {
  //       try {
  //         console.log('fetchData')
  //         // const url = `https://${process.env.EXPO_PUBLIC_API_DOMAIN}:5001/book?user_id=${auth.currentUser?.uid}`
  //         // const url = 'https://google.com'
  //         // console.log(url)
  //         // await axios.get(url)
  //         // console.log(res.data)
  //         // const yahooBooks = res.data.books.filter((b: Book) => b.platform_name === 'ヤフオク')
  //         // const ebayBooks = res.data.books.filter((b: Book) => b.platform_name === 'ebay')
  //         // setYahoo(yahooBooks)
  //         // setEbay(ebayBooks)
  //       } catch (e) {
  //         console.log('予約履歴取得時エラー: ', e)
  //       }
  //     }
  //     // eslint-disable-next-line @typescript-eslint/no-floating-promises
  //     fetchData()
  //   }, [])
  // )

  // const [now, setNow] = useState(new Date())
  // setNow(new Date())

  const handlePress = (pass: 'book_history' | 'buy_history' | 'plan'): void => {
    router.replace({
      pathname: 'menu',
      params: { redirectPass: pass }
    })
  }
  const numberOfReservationsAvailable = 30 // 予約可能件数
  const numberOfReservationsYahoo = 0 // yahoo?.length ?? 0// 予約数
  const numberOfReservationsEbay = 0 // ebay?.length ?? 0 // 予約数
  const numberOfReservations = numberOfReservationsYahoo + numberOfReservationsEbay // 予約数
  // const numberOfRest = numberOfReservationsAvailable - numberOfReservations

  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: 'ホーム' }} />
    <ScrollView>
    <View style={styles.container}>
        <View style={styles.plan}>
          {/* <Text style={styles.current_user}>{auth.currentUser?.email}</Text> */}
          <Text style={styles.plan_text}>xxxxxxプラン</Text>
          <TouchableOpacity onPress={ () => { handlePress('plan') }}>
            <Text style={styles.book_history_link_text}>プランを変更する</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.book_count}>
          <View>
            {/* <PieChart
              numberOfRest={numberOfRest}
              numberOfReservationsYahoo={numberOfReservationsYahoo}
              numberOfReservationsEbay={numberOfReservationsEbay}
            /> */}
          </View>
          <View>
            <Text style={styles.book_text}>{`${numberOfReservations}/${numberOfReservationsAvailable}`}件</Text>
            <Text style={styles.book_text_platform}>ヤフオク {numberOfReservationsYahoo}件</Text>
            <Text style={styles.book_text_platform}>eBay {numberOfReservationsEbay}件</Text>
          </View>
        </View>
        <View style={styles.book_history_link}>
          <TouchableOpacity onPress={ () => { handlePress('book_history') }}>
            <Text style={styles.book_history_link_text}>予約履歴を見る</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buy_history}>
          <Text style={styles.buy_history_text}> 今月の購入金額: {}件 </Text>
          <Text style={styles.buy_history_text}> 今月の購入件数: {}件 </Text>
        </View>
        <View style={styles.book_history_link}>
          <TouchableOpacity onPress={ () => { handlePress('buy_history') }}>
            <Text style={styles.book_history_link_text}>購入履歴を見る</Text>
          </TouchableOpacity>
        </View>
        {/* <Accordion title='使い方'>
          <Manual />
        </Accordion>
        <Accordion title='料金プラン'>
          <PriceList />
        </Accordion> */}
      </View>
    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 50
  },
  plan: {
    marginTop: 60,
    textAlign: 'center'
  },
  current_user: {
    fontSize: 20,
    textAlign: 'center'
  },
  plan_text: {
    fontSize: 30
  },
  book_count: {
    margin: 10,
    marginTop: 80,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  book_graph: {
    fontSize: 40
  },
  book_text: {
    fontSize: 40,
    marginBottom: 20
  },
  book_text_platform: {
    fontSize: 25
  },
  book_history_link: {
    marginTop: 70,
    padding: 10,
    backgroundColor: '#dcdcdc',
    borderRadius: 10,
    width: '80%'
  },
  book_history_link_text: {
    fontSize: 20,
    textAlign: 'center'
  },
  buy_history: {
    marginTop: 90
  },
  buy_history_text: {
    fontSize: 25,
    marginTop: 5
  }

})

export default Index
