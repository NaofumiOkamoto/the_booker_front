import { Stack } from 'expo-router'
import { View, StyleSheet, Text, ScrollView } from 'react-native'

const UserInfo = (): JSX.Element => {
  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: '利用規約' }} />
    <View style={styles.container}>
      <ScrollView style={styles.body_text}>
      <Text>
        ユーザー情報
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

export default UserInfo
