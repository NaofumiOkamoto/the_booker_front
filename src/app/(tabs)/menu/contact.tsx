import { Stack } from 'expo-router'
import { View, StyleSheet, Text, ScrollView } from 'react-native'

const Contact = (): JSX.Element => {
  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: 'お問い合わせ' }} />
    <View style={styles.container}>
      <ScrollView style={styles.body_text}>
      <Text>
        問い合わせフォーム
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

export default Contact
