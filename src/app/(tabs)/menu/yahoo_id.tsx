import { Stack } from 'expo-router'
import { View, StyleSheet, Text } from 'react-native'

const YahooId = (): JSX.Element => {
  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: 'Yahoo ID 登録' }} />
    <View style={styles.container}>
      <Text>Yahoo ID を登録する画面</Text>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default YahooId
