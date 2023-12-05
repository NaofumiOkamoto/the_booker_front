import { View, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { router } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import Header from '../../components/Header'
import CircleButton from '../../components/CircleButton'

const handlePress = (): void => {
  router.back()
}

const Create = (): JSX.Element => {
  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <Header />
      <View style={styles.inputContainer}>
        <TextInput multiline style={styles.input} value='' />
      </View>
      <CircleButton onPress={handlePress}>
        <Feather name='check' size={40}/>
      </CircleButton>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1
  },
  input: {
    flex: 1,
    textAlignVertical: 'top', // android用
    fontSize: 16,
    lineHeight: 24
  }
})

export default Create
