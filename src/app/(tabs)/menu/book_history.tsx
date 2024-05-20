import axios from 'axios'
import dayjs from 'dayjs'
import { Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { convertToCurrency } from '../../lib/function'

interface Book {
  id: number
  auction_id: string
  product_name: string
  close_time: Date
  bid_first_amount: number
  max_amount: number
  seconds: number
}
const BookHistory = (): JSX.Element => {
  const [books, setBooks] = useState<Book[]>([])
  useEffect(() => {
    void (async (): Promise<void> => {
      try {
        const res = await axios.get('http://153.126.213.57:5001/book?user_id=1')
        const books = res.data.books
        setBooks(books)
      } catch (e) {
        console.log('予約履歴取得時エラー: ', e)
      }
    })()
  }, [])
  console.log('after: books', books)

  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: '予約履歴' }} />
    <View style={styles.container}>
      <ScrollView style={styles.body_text}>
      <View>
        { books?.map(book => {
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
        }) }
      </View>
      </ScrollView>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
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
