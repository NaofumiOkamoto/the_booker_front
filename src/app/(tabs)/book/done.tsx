import { Stack, router, useLocalSearchParams } from 'expo-router'
import { View, StyleSheet, Text } from 'react-native'
// import { convertNum } from '../../lib/function'
// import Button from '../../../components/Button'
// import axios from 'axios'
// import dayjs from 'dayjs'

const Done = (): JSX.Element => {
  // const params = useLocalSearchParams()
  // const { auctionId, bidAmount, bidFirstAmount, maxAmount, selectSeconds, prodTitle, closeTime } = params
  // const handlePress = async (): Promise<void> => {
  // }

  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: '入力確認' }} />
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text>
          登録完了！！！
        </Text>
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