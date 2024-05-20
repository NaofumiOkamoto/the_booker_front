import { Stack, router } from 'expo-router'
import { View, StyleSheet, Text } from 'react-native'
// import { convertNum } from '../../lib/function'
import CustomButton from '../../../components/Button'
// import axios from 'axios'
// import dayjs from 'dayjs'

const Done = (): JSX.Element => {
  // const params = useLocalSearchParams()
  // const { auctionId, bidAmount, bidFirstAmount, maxAmount, selectSeconds, prodTitle, closeTime } = params
  // const handlePress = async (): Promise<void> => {
  // }
  const handlePress = (pass: string): void => {
    router.replace({ pathname: pass, params: { done: true } })
  }
  return (
    <>
    <Stack.Screen options={{ headerShown: false, title: '入力確認' }} />
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text>
          予約が完了しました。
        </Text>
        <CustomButton label='予約を続ける' onPress={ () => { handlePress('/book/form') }}/>
        <CustomButton label='予約完了' onPress={ () => { handlePress('/book') }}/>
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

export default Done
