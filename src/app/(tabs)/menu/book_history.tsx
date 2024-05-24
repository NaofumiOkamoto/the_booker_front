import axios from 'axios'
import dayjs from 'dayjs'
import { auth } from '../../../config'
import { Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Button } from 'react-native'
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
}
const BookHistory = (): JSX.Element => {
  const [books, setBooks] = useState<Book[]>([])
  const [selectedValue, setSelectedValue] = useState('予約中')
  const [isModalVisible, setModalVisibility] = useState(false)

  const filteredBooks =
    books?.filter(b => {
      const now = dayjs().add(9, 'h')
      return selectedValue === '予約中'
        ? dayjs(b.close_time) > now
        : dayjs(b.close_time) < now
    })
  useEffect(() => {
    void (async (): Promise<void> => {
      try {
        const res = await axios.get(`http://153.126.213.57:5001/book?user_id=${auth.currentUser?.uid}`)
        const books = res.data.books
        console.log('books.length', books.length)
        setBooks(books)
      } catch (e) {
        console.log('予約履歴取得時エラー: ', e)
      }
    })()
  }, [])

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
      <ScrollView style={styles.body_text}>
      <View>
        {(filteredBooks.length > 0)
          ? filteredBooks.map(book => {
            return (
            <View style={styles.list} key={book.id}>
              <Text style={styles.list_text}>{book.product_name}</Text>
              <Text style={styles.list_text}>オークションID: {book.auction_id}</Text>
              <Text style={styles.list_text}>終了予定日時: {dayjs(book.close_time).format('YYYY/MM/DD hh:mm:ss')}</Text>
              <Text style={styles.list_text}>初回入札金額: {convertToCurrency(String(book.bid_first_amount))}</Text>
              <Text style={styles.list_text}>上限金額: {convertToCurrency(String(book.max_amount))}</Text>
              <Text style={styles.list_text}>入札時間: 終了{book.seconds}秒前</Text>
            </View>
            )
          })
          : <View><Text>存在しません</Text></View>}
      </View>
      </ScrollView>
      <DatePicker
        isModalVisible={isModalVisible}
        setModalVisibility={setModalVisibility}
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
