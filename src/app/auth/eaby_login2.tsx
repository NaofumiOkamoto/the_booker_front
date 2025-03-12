import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useAuth } from '../auth/AuthProvider'

const EbayLogIn2 = (): JSX.Element => {
  const { promptAsync, logout, ebayUser } = useAuth()

  return (
    <View>
      <View style={styles.item}>
        <TouchableOpacity onPress={() => { void (async () => { await promptAsync() })() }}>
          <Text>eBayでログイン</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <TouchableOpacity onPress={() => { void (async () => { await logout() })() }}>
          <Text>ログアウト</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <Text>ebay user name: {ebayUser}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    marginTop: 100
  }
})

export default EbayLogIn2
