import { Stack, router, useLocalSearchParams } from 'expo-router'
import { View, StyleSheet, Text } from 'react-native'
import { convertNum, convertStringToDate } from '../../lib/function'
import { auth } from '../../../config'
import CustomButton from '../../../components/Button'
import axios from 'axios'
// import dayjs from 'dayjs'

console.log(process.env.EXPO_PUBLIC_API_DOMAIN)
const Confirm = (): JSX.Element => {
  const params = useLocalSearchParams()
  const { auctionId, bidFirstAmount, maxAmount, selectSeconds, prodTitle, closeTimeString, platform } = params
  const handlePress = async (): Promise<void> => {
    const res = await axios.post(`http://${process.env.EXPO_PUBLIC_API_DOMAIN}:5001/book`, {
      book: {
        user_id: auth.currentUser?.uid,
        platform_name: platform,
        auction_id: auctionId,
        product_name: prodTitle,
        bid_first_amount: bidFirstAmount === '' ? null : convertNum(bidFirstAmount as string),
        max_amount: maxAmount === '' ? null : convertNum(maxAmount as string),
        seconds: selectSeconds,
        close_time: convertStringToDate(String(closeTimeString))
      }
    })
    console.log('post res: ', res)
    if (res.status === 204) {
      router.replace(
        {
          pathname: '/(tabs)/book/done',
          params: { platform }
        }
      )
    }
  }

  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: '入力確認' }} />
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.column}>予約サイト: {platform}</Text>
        <Text style={styles.column}>オークションID: { auctionId }</Text>
        <Text style={styles.column}>終了日時: {closeTimeString}</Text>
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
