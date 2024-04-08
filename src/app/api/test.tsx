import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import axios from 'axios'

const ApiTest = (): JSX.Element => {
  const [text, setText] = useState('aaa')

  const handlePress = (): void => {
    axios.get('https://httpbin.org/get').then(
      (result) => {
        console.log(result.data.origin)
        setText(result.data.origin)
      }).catch((e) => {
      console.log(e)
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonLabel}>apiを叩く</Text>
      </TouchableOpacity>
      <View>
        <Text> {text} </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24
  },
  button: {
    backgroundColor: '#467FD3',
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 20
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 24
  }
})

export default ApiTest
