import axios from 'axios'
import dayjs from 'dayjs'
import { auth } from '../../../config'
import { Stack, router } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Button, TouchableOpacity } from 'react-native'
import { convertToCurrency } from '../../lib/function'
import ToggleSwitch from '../../../components/ToggleSwitch'
import DatePicker from '../../../components/DatePicker'

export interface Book {
  id: number
  auction_id: string
  platform_name: 'ヤフオク' | 'ebay'
  product_name: string
  close_time: Date
  bid_first_amount: number
  max_amount: number
  seconds: number
  created_at: Date
}
console.log(process.env.EXPO_PUBLIC_API_DOMAIN)
const BookHistory = (): JSX.Element => {
  const [books, setBooks] = useState<Book[]>([])
  const [selectedValue, setSelectedValue] = useState('予約中')
  const [isModalVisible, setModalVisibility] = useState(false)
  const [startDate, setStartDate] = useState<dayjs.Dayjs | undefined>(undefined)
  const [endDate, setEndDate] = useState<dayjs.Dayjs | undefined>(undefined)
  const [isSearch, setIsSearch] = useState(false)
  const [searchText, setSearchText] = useState('')

  const filteredBooks =
    books?.filter(b => {
      const now = dayjs()
      const closeTime = dayjs(b.close_time)
      return selectedValue === '予約中'
        ? closeTime > now
        : closeTime < now
    })
      .filter(b => {
        if (!isSearch) return true
        const startDateday = startDate?.format('YYYY-MM-DD')
        const endDateday = endDate?.format('YYYY-MM-DD')
        if (startDateday === undefined) return true
        const createdAt = dayjs(b.created_at)
        const isMatchDate = endDateday === undefined
          ? createdAt.format('YYYY-MM-DD') === startDateday
          : startDateday <= createdAt.format('YYYY-MM-DD') && createdAt.format('YYYY-MM-DD') <= endDateday
        return isMatchDate
      })
      .filter(b => {
        if (searchText === '') return true
        const isMatchTitle = b.product_name.includes(searchText)
        return isMatchTitle
      })

  useEffect(() => {
    void (async (): Promise<void> => {
      try {
        const url = `http://${process.env.EXPO_PUBLIC_API_DOMAIN}:5001/book?user_id=${auth.currentUser?.uid}`
        const res = await axios.get(url)
        const books = res.data.books
        setBooks(books)
      } catch (e) {
        console.log('予約履歴取得時エラー: ', e)
      }
    })()
  }, [])

  const handlePress = (auctionId: string, bidTime: string, closeTime: string): void => {
    router.push(
      {
        pathname: '/menu/book_history_detail',
        params: { auctionId, bidTime, closeTime }
      }
    )
  }

  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: '予約履歴' }} />
    <View style={styles.container}>
      <View style={styles.header}>
        <ToggleSwitch selectedValue={selectedValue} onToggle={setSelectedValue} />
        <View style={styles.search_button} >
          <Button
            title='検索'
            onPress={() => { setModalVisibility(true) }}
          />
        </View>
      </View>
      {isSearch && startDate !== undefined && <Text>検索開始日: {String(startDate?.format('YYYY-MM-DD'))}</Text>}
      {isSearch && endDate !== undefined && <Text>検索終了日: {String(endDate?.format('YYYY-MM-DD'))}</Text>}
      {isSearch && searchText !== '' && <Text>検索キーワード: {searchText}</Text>}
      <ScrollView style={styles.body_text}>
      <View>
        {(filteredBooks.length > 0)
          ? filteredBooks.map(book => {
            return (
            <View style={styles.list} key={book.id}>
              <TouchableOpacity onPress={ () => { handlePress(book.auction_id, book.bid_time, book.close_time) }}>
                <Text style={styles.list_text}>{book.product_name}</Text>
                <Text style={styles.list_text}>オークションID: {book.auction_id}</Text>
                <Text style={styles.list_text}>予約登録日時: {String(book.created_at)}</Text>
                <Text style={styles.list_text}>終了予定日時: {String(book.close_time)}</Text>
                <Text style={styles.list_text}>初回入札金額: {convertToCurrency(String(book.bid_first_amount))}</Text>
                <Text style={styles.list_text}>上限金額: {convertToCurrency(String(book.max_amount))}</Text>
                <Text style={styles.list_text}>入札時間: 終了{book.seconds}秒前</Text>
              </TouchableOpacity>
            </View>
            )
          })
          : <View><Text>存在しません</Text></View>}
      </View>
      </ScrollView>
      <DatePicker
        isModalVisible={isModalVisible}
        setModalVisibility={setModalVisibility}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setIsSearch={setIsSearch}
        setSearchText={setSearchText}
        searchText={searchText}
      />
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row' // 縦で割る
  },
  search_button: {
    margin: 20
  },
  body_text: {
    paddingTop: 30
  },
  list: {
    marginTop: 20,
    paddingBottom: 15,
    width: '90%',
    borderBottomWidth: 1,
    borderColor: '#DDD'
  },
  list_text: {
    fontSize: 15
  }

})

export default BookHistory
