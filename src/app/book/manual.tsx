import { View, StyleSheet, Text } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import CircleButton from '../../components/CircleButton'
import LogOutButton from '../../components/LogOutButton'
import Footer from '../../components/Footer'

const Manual = (): JSX.Element => {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => { return <LogOutButton /> }
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text>使い方をここに記載する</Text>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Manual
