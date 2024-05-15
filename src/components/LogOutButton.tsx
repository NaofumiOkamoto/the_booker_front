import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { signOut } from 'firebase/auth'
import { router } from 'expo-router'
import { auth } from '../config'

const handlePress = (): void => {
  signOut(auth)
    .then(() => {
      router.replace('auth/log_in')
    })
    .catch(() => {
      Alert.alert('ログアウトえらー')
    })
}

const LogOutButton = (): JSX.Element => {
  return (
    <TouchableOpacity style={styles.list_item}onPress={handlePress}>
      <Text style={styles.list_item_text}>ログアウト</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  list_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)'
  },
  list_item_text: {
    fontSize: 16,
    lineHeight: 25,
    paddingLeft: 20
  }
})

export default LogOutButton
