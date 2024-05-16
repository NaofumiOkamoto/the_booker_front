import { Stack } from 'expo-router'
import { View, StyleSheet, Text, ScrollView } from 'react-native'

const UsageSituation = (): JSX.Element => {
  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: '利用規約' }} />
    <View style={styles.container}>
      <ScrollView style={styles.body_text}>
      <Text>
        利用状況
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

export default UsageSituation
