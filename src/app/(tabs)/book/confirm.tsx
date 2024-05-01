import { Stack, router, useLocalSearchParams } from 'expo-router'
import { View, StyleSheet, Text } from 'react-native'
import { convertNum } from '../../lib/function'
import CustomButton from '../../../components/Button'
import axios from 'axios'
import dayjs from 'dayjs'

const Confirm = (): JSX.Element => {
  const params = useLocalSearchParams()
  const { auctionId, bidAmount, bidFirstAmount, maxAmount, selectSeconds, prodTitle, closeTime } = params
  const handlePress = async (): Promise<void> => {
    const res = await axios.post('http://localhost:5001/book', {
      book: {
        user_id: 1,
        auction_id: auctionId,
        product_name: prodTitle,
        bid_amount: bidAmount === '' ? null : convertNum(bidAmount as string),
        bid_first_amount: bidFirstAmount === '' ? null : convertNum(bidFirstAmount as string),
        max_amount: maxAmount === '' ? null : convertNum(maxAmount as string),
        seconds: selectSeconds,
        close_time: dayjs(closeTime as unknown as Date).format('YYYY-MM-DD hh:mm:ss')
        // close_time: closeTime
      }
    })
    console.log('post res: ', res)
    router.replace('/(tabs)/book/done')
  }

  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: '入力確認' }} />
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.column}>オークションID: { auctionId }</Text>
        <Text style={styles.column}>入札金額: {bidAmount}</Text>
        <Text style={styles.column}>初回入札金額: {bidFirstAmount}</Text>
        <Text style={styles.column}>上限金額: {maxAmount}</Text>
        <Text style={styles.column}>{selectSeconds}秒前に入札</Text>
        <CustomButton
          label='登録'
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onPress={ async () => { await handlePress() } }
        />
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
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27
  },
  column: {
    fontSize: 18,
    marginVertical: 20
  }
})

export default Confirm
