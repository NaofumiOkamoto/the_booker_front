import { Stack, router, useLocalSearchParams } from 'expo-router'
import { View, StyleSheet, Text } from 'react-native'
import Button from '../../../components/Button'
import axios from 'axios'

const Confirm = (): JSX.Element => {
  const handlePress = async (): Promise<void> => {
    const res = await axios.post('http://localhost:5001/book', {
      book: {
        user_id: 1,
        auction_id: auctionId,
        product_name: prodTitle
      }
    })
    console.log('post res: ', res)
    router.push('/book/confirm')
  }

  const params = useLocalSearchParams()
  const { auctionId, bidAmount, bitFirstAmount, maxAmount, selectMinute, prodTitle } = params

  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: '入力確認' }} />
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.column}>オークションID: { auctionId }</Text>
        <Text style={styles.column}>入札金額: {bidAmount}</Text>
        <Text style={styles.column}>初回入札金額: {bitFirstAmount}</Text>
        <Text style={styles.column}>上限金額: {maxAmount}</Text>
        <Text style={styles.column}>{selectMinute}秒前に入札</Text>
        <Button label='登録' onPress={ async () => { await handlePress() } }/>
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
