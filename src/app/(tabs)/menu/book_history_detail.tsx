import axios from 'axios'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

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
const BookHistory = (): JSX.Element => {
  const params = useLocalSearchParams()
  const { auctionId } = params
  const [imageUri, setImageUri] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    void (async (): Promise<void> => {
      try {
        const response = await axios.get(`http://153.126.213.57:5001/api/get_img?auctionId=${auctionId}`, { responseType: 'blob' })
        const reader = new FileReader()
        reader.onload = () => {
          setImageUri(reader.result)
        }

        reader.readAsDataURL(response.data)
      } catch (e) {
        setMessage(`${auctionId}の画像はありません`)
        console.log('img取得エラー: ', e)
      }
    })()
  }, [])

  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: '予約履歴詳細' }} />
    <View style={styles.container}>
    <Text>詳細</Text>

    {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

    <Text>{message}</Text>
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
  image: {
    width: '95%',
    height: 300
  }
})

export default BookHistory
