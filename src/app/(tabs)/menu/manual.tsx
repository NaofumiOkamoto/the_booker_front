import { Stack } from 'expo-router'
import { View, StyleSheet, Text, ScrollView } from 'react-native'

const Manual = (): JSX.Element => {
  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: '利用規約' }} />
    <View style={styles.container}>
      <ScrollView style={styles.body_text}>
      <Text>
        使い方を書く
      </Text>
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
  }
})

export default Manual
