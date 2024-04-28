import axios from 'axios'
import { Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'

interface Book {
  id: number
  auction_id: string
  product_name: string
}
const BookHistory = (): JSX.Element => {
  const [books, setBooks] = useState<Book[]>([])
  useEffect(() => {
    void (async (): Promise<void> => {
      try {
        const res = await axios.get('http://localhost:5001/book?user_id=1')
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
          return (<Text style={styles.list} key={book.id}>{book.product_name},</Text>)
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
    padding: 30
  },
  list: {
    marginTop: 20
  }
})

export default BookHistory
